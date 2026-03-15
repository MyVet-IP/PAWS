require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const { errorHandler, notFound } = require('./middleware');
const bcrypt = require("bcrypt");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares básicos ──────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "paws_secret",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
    try {

        const user = await db.get(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        done(null, user);

    } catch (error) {

        done(error, null);

    }
});


// ── Estáticos del frontend ───────────────────────────────────────────────────
const noCache = {
  etag: false,
  lastModified: false,
  setHeaders: res => res.setHeader('Cache-Control', 'no-store')
};
app.use(express.static(path.join(__dirname, '..'), noCache));
app.use(express.static(path.join(__dirname, '..', 'frontend'), noCache));

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ ok: true, message: 'API corriendo' }));

// ── Rutas API ─────────────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/pets', require('./routes/pets'));
app.use('/api/businesses', require('./routes/businesses'));
app.use('/api/medical-records', require('./routes/medicalRecords'));
app.use('/api/emergencies', require('./routes/emergencies'));
app.use('/auth', require('./routes/auth'));

// ── SPA fallback — redirige todo lo que no sea /api al index.html ─────────────
app.get(/^\/(?!api)(?:[^.]*)?$/, (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'index.html'))
);

// ── REGISTER DB ──────────────────────────────────────────────────────────────────────

app.post("/api/register", async (req, res) => {

    const { name, email, password, role } = req.body;

    try {

        // verificar si el email ya existe
        const existingUser = await db.get(
            "SELECT user_id FROM users WHERE email = $1",
            [email]
        );

        if (existingUser) {
            return res.status(400).json({
                message: "Este correo ya está registrado"
            });
        }

        // encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // insertar usuario
        await db.run(
            "INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4)",
            [name, email, hashedPassword, role]
        );

        res.status(201).json({
            message: "Usuario registrado correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error en el servidor :P"
        });

    }

});

// ── Error handlers (siempre al final) ────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Arranque ──────────────────────────────────────────────────────────────────
async function startServer() {
  try {
    await db.initialize();
    app.listen(PORT, () => {
      console.log(`\n========================================`);
      console.log(` Server: http://localhost:${PORT}`);
      console.log(` API:    http://localhost:${PORT}/api/health`);
      console.log(`========================================\n`);
    });
  } catch (err) {
    console.error('Error iniciando servidor:', err);
    process.exit(1);
  }
}

process.on('SIGINT', async () => { await db.close(); process.exit(0); });
process.on('SIGTERM', async () => { await db.close(); process.exit(0); });

startServer();
module.exports = app;