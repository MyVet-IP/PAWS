const storage = require('../storage');
const authStorage = require('../storage/authStorage');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ACCESS_EXPIRES = '15m';
const REFRESH_EXPIRES_SECONDS = 60 * 60 * 24 * 7; // 7 days

function createAccessToken(payload) {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  return jwt.sign(payload, secret, { expiresIn: ACCESS_EXPIRES });
}

function createRefreshToken(payload) {
  const secret = process.env.REFRESH_SECRET || (process.env.JWT_SECRET || 'dev-secret');
  // we'll sign refresh token with separate secret or same for simplicity
  return jwt.sign(payload, secret, { expiresIn: `${REFRESH_EXPIRES_SECONDS}s` });
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const cliente = await storage.getClienteByEmail(email);
    if (!cliente) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, cliente.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const userPayload = { id: cliente.id_cliente, email: cliente.email };
    const accessToken = createAccessToken(userPayload);
    const refreshToken = createRefreshToken(userPayload);

    // persist refresh token
    const expiresAt = new Date(Date.now() + REFRESH_EXPIRES_SECONDS * 1000);
    await authStorage.createRefreshToken(cliente.id_cliente, refreshToken, expiresAt);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      // access token short lived
    };

    res.cookie('access_token', accessToken, Object.assign({}, cookieOptions, { maxAge: 15 * 60 * 1000 }));
    res.cookie('refresh_token', refreshToken, Object.assign({}, cookieOptions, { maxAge: REFRESH_EXPIRES_SECONDS * 1000 }));

    const { password: _, ...user } = cliente;
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const token = req.cookies && req.cookies.refresh_token;
    if (!token) return res.status(401).json({ error: 'Refresh token missing' });

    const secret = process.env.REFRESH_SECRET || (process.env.JWT_SECRET || 'dev-secret');
    let payload;
    try {
      payload = jwt.verify(token, secret);
    } catch (err) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }

    // verify token exists in DB
    const stored = await authStorage.getRefreshToken(token);
    if (!stored) return res.status(403).json({ error: 'Refresh token revoked' });

    // issue new access token
    const accessToken = createAccessToken({ id: payload.id, email: payload.email });
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    };
    res.cookie('access_token', accessToken, Object.assign({}, cookieOptions, { maxAge: 15 * 60 * 1000 }));
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    const refresh = req.cookies && req.cookies.refresh_token;
    if (refresh) {
      await authStorage.deleteRefreshToken(refresh);
    }
    // Clear cookies
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ error: 'Not authenticated' });
    const user = await storage.getClienteById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const { password: _, ...safe } = user;
    res.json(safe);
  } catch (err) {
    next(err);
  }
}

module.exports = { login, refresh, logout, me };
