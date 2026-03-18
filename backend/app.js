// ─────────────────────────────────────────────
//  app.js
//  Solo responsabilidades de app:
//    - Middlewares globales
//    - Registro de rutas
//    - Arranque del servidor
//
//  Todo lo demás vive en su carpeta:
//    config/passport.js  → Passport + Google Strategy
//    routes/             → Definición de rutas
//    controllers/        → Lógica de negocio
//    storage/            → Queries SQL
// ─────────────────────────────────────────────
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const db = require('./db');
const passport = require('./config/passport');        // carga serialize + strategy
const { errorHandler, notFound } = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares globales ──────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'paws_secret',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// ── Archivos estáticos ────────────────────────────────────────────────────────
const noCache = {
    etag: false,
    lastModified: false,
    setHeaders: res => res.setHeader('Cache-Control', 'no-store'),
};
app.use(express.static(path.join(__dirname, '..'), noCache));
app.use(express.static(path.join(__dirname, '..', 'frontend'), noCache));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ── Rutas API ─────────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ ok: true, message: 'API corriendo' }));
app.get('/api/config', (req, res) => res.json({ mapsKey: process.env.GOOGLE_MAPS_API_KEY || '' }));

app.use('/auth', require('./routes/auth'));          // Google OAuth callback
app.use('/api/auth', require('./routes/auth'));
app.use('/api/animal-types', require('./routes/animalTypes'));   // ← movido de app.js
app.use('/api/ai', require('./routes/ai'));
app.use('/api/pets', require('./routes/pets'));
app.use('/api/users', require('./routes/users'));
app.use('/api/businesses', require('./routes/businesses'));
app.use('/api/emergencies', require('./routes/emergencies'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/medical-records', require('./routes/medicalRecords'));
app.use('/api/contact', require('./routes/contact'));

// ── SPA fallback ──────────────────────────────────────────────────────────────
app.get(/^\/(?!api)(?:[^.]*)?$/, (req, res) =>
    res.sendFile(path.join(__dirname, '..', 'index.html'))
);

// ── Error handlers (siempre al final) ────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Arranque ──────────────────────────────────────────────────────────────────
async function startServer() {
    try {
        await db.initialize();
        app.listen(PORT, () => {
            console.log(` Server: http://localhost:${PORT}`);
            console.log(` API:    http://localhost:${PORT}/api/health`);
        });
    } catch (err) {
        console.error('Failed to start server:', err.message);
        process.exit(1);
    }
}

process.on('SIGINT', async () => { await db.close(); process.exit(0); });
process.on('SIGTERM', async () => { await db.close(); process.exit(0); });

startServer();
module.exports = app;