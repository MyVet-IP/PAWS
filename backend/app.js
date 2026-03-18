require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const { errorHandler, notFound } = require('./middleware');
const bcrypt = require("bcrypt");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const cookieParser = require('cookie-parser');

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
app.use(cookieParser());

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
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ ok: true, message: 'API corriendo' }));

// ── Animal types ───────────────────
app.get('/api/animal-types', async (req, res, next) => {
    try {
        const types = await db.all('SELECT * FROM animal_types ORDER BY animal_type_id ASC');
        res.json(types);
    } catch (err) {
        next(err);
    }
});

// ── Rutas API ─────────────────────────────────────────────────────────────────
app.use('/auth', require('./routes/auth'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pets', require('./routes/pets'));
app.use('/api/users', require('./routes/users'));
app.use('/api/businesses', require('./routes/businesses'));
app.use('/api/emergencies', require('./routes/emergencies'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/medical-records', require('./routes/medicalRecords'));
app.use('/api/contact', require('./routes/contact'));

app.get('/api/config', (req, res) => {
    res.json({ mapsKey: process.env.GOOGLE_MAPS_API_KEY || '' });
});

// ── SPA fallback — redirige todo lo que no sea /api al index.html ─────────────
app.get(/^\/(?!api)(?:[^.]*)?$/, (req, res) =>
    res.sendFile(path.join(__dirname, '..', 'index.html'))
);

// ── REGISTER ──────────────────────────────────────────────────────────────────
app.post("/api/register", async (req, res) => {
    const { name, email, password, role, nit } = req.body;
    const roleMap = { owner: 'user', vet: 'business', business: 'business' };
    const dbRole = roleMap[role] || 'user';
    const normalizedEmail = String(email || '').toLowerCase().trim();

    // Use a transaction so user + business are created atomically
    const client = await db.pool.connect();
    try {
        await client.query('BEGIN');

        const existingUser = await client.query(
            "SELECT user_id FROM users WHERE email = $1", [normalizedEmail]
        );
        if (existingUser.rows[0]) {
            await client.query('ROLLBACK');
            return res.status(400).json({ message: "Este correo ya está registrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userResult = await client.query(
            "INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING user_id",
            [name, normalizedEmail, hashedPassword, dbRole]
        );
        const userId = userResult.rows[0].user_id;

        // Auto-create business profile for vet/business roles
        if (dbRole === 'business') {
            const normalizedNit = (nit || '').toString().trim();
            if (!normalizedNit) {
                await client.query('ROLLBACK');
                return res.status(400).json({ message: "El NIT es obligatorio para cuentas de veterinaria" });
            }

            const businessType = 'clinic';

            const bizResult = await client.query(
                `INSERT INTO businesses (user_id, business_type, name, address, status, city, nit, nit_verified)
                 VALUES ($1, $2, $3, '', 'active', 'Medellín', $4, 'pending') RETURNING business_id`,
                [userId, businessType, name, normalizedNit]
            );
            const businessId = bizResult.rows[0].business_id;

            await client.query(
                `INSERT INTO clinics (business_id) VALUES ($1)`, [businessId]
            );

            // Create default schedule (Mon-Sat open, Sun closed)
            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            for (const day of days) {
                const isSunday = day === 'Sunday';
                const isSaturday = day === 'Saturday';
                await client.query(
                    `INSERT INTO schedules (business_id, day_of_week, open_time, close_time, is_open)
                     VALUES ($1, $2, $3, $4, $5)`,
                    [
                        businessId,
                        day,
                        isSunday ? null : '09:00',
                        isSunday ? null : (isSaturday ? '14:00' : '18:00'),
                        !isSunday
                    ]
                );
            }
        }

        await client.query('COMMIT');
        res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    } finally {
        client.release();
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