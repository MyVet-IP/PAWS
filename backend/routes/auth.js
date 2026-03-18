// ─────────────────────────────────────────────
//  routes/auth.js
//  Solo define rutas. La lógica de negocio vive
//  en authController; la config de Passport en
//  config/passport.js (cargado desde app.js).
// ─────────────────────────────────────────────
const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../db');
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// ── Rutas de autenticación local ─────────────────────────────────────────────
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.get('/me', authenticateToken, authController.me);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// ── Google OAuth ──────────────────────────────────────────────────────────────
// La estrategia se registra en config/passport.js.
// Estas rutas solo disparan el flujo si las credenciales están configuradas.

router.get('/google', (req, res, next) => {
    if (!process.env.GOOGLE_CLIENT_ID) {
        return res.status(501).json({ error: 'Google OAuth no configurado' });
    }
    const role = req.query.role || 'user';
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        state: role,
    })(req, res, next);
});

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/#/login' }),
    async (req, res) => {
        try {
            const role = req.query.state || 'user';
            const { email, name } = req.user;

            let user = await db.get(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );

            if (!user) {
                const fakePassword = await bcrypt.hash('google_login', 10);
                user = await db.get(
                    'INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING *',
                    [name, email, fakePassword, role]
                );
            }

            const userData = {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                role: user.role,
            };

            const encodedUser = encodeURIComponent(JSON.stringify(userData));
            const appUrl = process.env.APP_URL || 'http://localhost:3000';
            return res.redirect(`${appUrl}/#/google-login-success?user=${encodedUser}`);
        } catch (error) {
            console.error('[Google Callback]', error);
            const appUrl = process.env.APP_URL || 'http://localhost:3000';
            res.redirect(`${appUrl}/#/login`);
        }
    }
);

module.exports = router;