const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const { errorHandler, notFound } = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares basicos
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// servir archivos estaticos del frontend
const frontendPath = path.join(__dirname, '..', 'frontend');
const rootPath = path.join(__dirname, '..');
app.use(express.static(rootPath, { etag: false, lastModified: false, setHeaders: (res) => { res.setHeader('Cache-Control', 'no-store'); } }));
app.use(express.static(frontendPath, { etag: false, lastModified: false, setHeaders: (res) => { res.setHeader('Cache-Control', 'no-store'); } }));

// endpoint de health check para verificar que el server esta corriendo
app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'API corriendo' });
});

// rutas de la api
app.use('/api', require('./routes/auth'));
app.use('/api/clientes', require('./routes/clients'));
app.use('/api', require('./routes/clinics'));
app.use('/api', require('./routes/pets'));
app.use('/api', require('./routes/visits'));
app.use('/api', require('./routes/emergencies'));
app.use('/api/users', require('./routes/users'));

// redirigir todo lo que no sea /api al index.html (para el router del frontend)
app.get(/^\/(?!api)(?:[^.]*)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// middlewares de error - van al final siempre
app.use(notFound);
app.use(errorHandler);

async function startServer() {
  try {
    await db.initialize();
    app.listen(PORT, () => {
      console.log(`\n========================================`);
      console.log(` VetCare server started`);
      console.log(` URL: http://localhost:${PORT}`);
      console.log(` API: http://localhost:${PORT}/api/health`);
      console.log(`========================================\n`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  console.log('\n\nCerrando servidor...');
  await db.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n\nCerrando servidor...');
  await db.close();
  process.exit(0);
});

startServer();

module.exports = app;

