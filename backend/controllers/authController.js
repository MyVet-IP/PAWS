const authStorage = require('../storage/authStorage');
const jwt = require('jsonwebtoken');

const ALLOWED_ADMIN_EMAIL = (process.env.ADMIN_LOGIN_EMAIL || 'adminpaws@crudzaso.com').toLowerCase();

const ACCESS_EXPIRES = '15m';
const REFRESH_EXPIRES_SECONDS = 60 * 60 * 24 * 7; // 7 días

function createAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', { expiresIn: ACCESS_EXPIRES });
}

function createRefreshToken(payload) {
    const secret = process.env.REFRESH_SECRET || process.env.JWT_SECRET || 'dev-secret';
    return jwt.sign(payload, secret, { expiresIn: `${REFRESH_EXPIRES_SECONDS}s` });
}

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, phone, role } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ error: 'name, email y password son requeridos' });

        const normalizedEmail = String(email).toLowerCase().trim();
        const requestedRole = role === 'admin' ? 'user' : role;

        const existing = await authStorage.getUserByEmail(normalizedEmail);
        if (existing)
            return res.status(400).json({ error: 'El email ya está registrado' });

        const user = await authStorage.createUser({
            name,
            email: normalizedEmail,
            password,
            phone,
            role: requestedRole
        });
        res.status(201).json(user);
    } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: 'Email y password son requeridos' });

        const normalizedEmail = String(email).toLowerCase().trim();

        const user = await authStorage.getUserByEmail(normalizedEmail);
        if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

        // Only this specific email is allowed to authenticate as admin.
        if (user.role === 'admin' && user.email.toLowerCase() !== ALLOWED_ADMIN_EMAIL) {
            return res.status(403).json({ error: 'Admin login is restricted' });
        }
        if (normalizedEmail === ALLOWED_ADMIN_EMAIL && user.role !== 'admin') {
            return res.status(403).json({ error: 'This account is reserved for admin access' });
        }

        const valid = await authStorage.verifyPassword(password, user.password);
        if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });

        const payload = { id: user.user_id, email: user.email, role: user.role };
        const accessToken = createAccessToken(payload);
        const refreshToken = createRefreshToken(payload);

        const expiresAt = new Date(Date.now() + REFRESH_EXPIRES_SECONDS * 1000);
        await authStorage.createRefreshToken(user.user_id, refreshToken, expiresAt);

        const cookieOpts = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        };
        res.cookie('access_token', accessToken, { ...cookieOpts, maxAge: 15 * 60 * 1000 });
        res.cookie('refresh_token', refreshToken, { ...cookieOpts, maxAge: REFRESH_EXPIRES_SECONDS * 1000 });

        const { password: _, ...safeUser } = user;
        res.json({ user: safeUser });
    } catch (err) { next(err); }
};

exports.refresh = async (req, res, next) => {
    try {
        const token = req.cookies?.refresh_token;
        if (!token) return res.status(401).json({ error: 'Refresh token missing' });

        const secret = process.env.REFRESH_SECRET || process.env.JWT_SECRET || 'dev-secret';
        let payload;
        try { payload = jwt.verify(token, secret); }
        catch { return res.status(403).json({ error: 'Invalid refresh token' }); }

        const stored = await authStorage.getRefreshToken(token);
        if (!stored) return res.status(403).json({ error: 'Refresh token revoked' });

        const accessToken = createAccessToken({ id: payload.id, email: payload.email, role: payload.role });
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000
        });
        res.json({ ok: true });
    } catch (err) { next(err); }
};

exports.logout = async (req, res, next) => {
    try {
        const token = req.cookies?.refresh_token;
        if (token) await authStorage.deleteRefreshToken(token);
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        res.json({ ok: true });
    } catch (err) { next(err); }
};

exports.me = async (req, res, next) => {
    try {
        const user = await authStorage.getUserById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        const { password: _, ...safe } = user;
        res.json(safe);
    } catch (err) { next(err); }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required' });

        const user = await authStorage.getUserByEmail(email);
        if (!user) {
            // Return 200 even if user doesn't exist to prevent email enumeration
            return res.json({ message: 'If the email exists, a password recovery link has been sent.' });
        }

        // Create a short-lived token specifically for password reset
        const resetSecret = process.env.JWT_SECRET || 'dev-secret';
        const resetToken = jwt.sign(
            { id: user.user_id, email: user.email, purpose: 'password_reset' },
            resetSecret,
            { expiresIn: '15m' }
        );

        // Send to N8N Webhook (password-recovery workflow)
        const n8nWebhookUrl = process.env.N8N_RECOVERY_WEBHOOK || 'https://arnoldow.app.n8n.cloud/webhook/password-recovery';
        const appUrl = process.env.APP_URL || 'http://localhost:3000';
        const resetLink = `${appUrl}/#/reset-password?token=${resetToken}`;

        try {
            await fetch(n8nWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    name: user.name,
                    resetLink: resetLink
                })
            });
        } catch (fetchErr) {
            console.error("Error triggering current N8N webhook:", fetchErr);
            // We do not return 500 here since the token was created successfully,
            // but in production failing to trigger n8n means the email wasn't sent.
            return res.status(500).json({ error: 'Internal error contacting the mail service.' });
        }

        res.json({ message: 'If the email exists, a password recovery link has been sent.' });
    } catch (err) { next(err); }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).json({ error: 'Token and new password are required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        const resetSecret = process.env.JWT_SECRET || 'dev-secret';
        let payload;
        try {
            payload = jwt.verify(token, resetSecret);
        } catch (err) {
            return res.status(400).json({ error: 'The recovery link is invalid or has expired.' });
        }

        if (payload.purpose !== 'password_reset' || !payload.id) {
            return res.status(400).json({ error: 'Invalid token' });
        }

        const user = await authStorage.getUserById(payload.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await authStorage.updatePassword(user.user_id, newPassword);

        res.json({ message: 'Password updated successfully. You can now sign in.' });
    } catch (err) { next(err); }
};