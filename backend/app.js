require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const { errorHandler, notFound } = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares básicos ──────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use('api/ai', require('./routes/ai'));

// ── SPA fallback — redirige todo lo que no sea /api al index.html ─────────────
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