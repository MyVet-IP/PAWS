require('dotenv').config({ path: '../.env' });

const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const storage = require('./storage');
const { errorHandler, notFound, validateBody } = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const frontendPath = path.join(__dirname, '..', 'frontend');
const rootPath = path.join(__dirname, '..');
app.use(express.static(rootPath));
app.use(express.static(frontendPath));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'API running' });
});

app.get('/api/clientes', async (req, res) => {
  try {
    const clientes = await storage.getAllClientes();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/clientes/:id', async (req, res) => {
  try {
    const cliente = await storage.getClienteById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/clientes', async (req, res) => {
  try {
    const { nombre, email, password, telefono } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: 'nombre, email and password are required' });
    }

    const cliente = await storage.createCliente(nombre, email, password, telefono);
    res.status(201).json(cliente);
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/clientes/:id', async (req, res) => {
  try {
    const cliente = await storage.updateCliente(req.params.id, req.body);
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/clinics', async (req, res) => {
  try {
    const { location } = req.query;

    let veterinarias;
    if (location) {
      veterinarias = await storage.getVeterinariasByLocation(location);
    } else {
      veterinarias = await storage.getAllVeterinarias();
    }

    veterinarias = veterinarias.map(vet => ({
      ...vet,
      specialties: vet.servicios.map(s => s.nombre.toUpperCase()),
      image: vet.imagen,
      location: vet.direccion
    }));

    res.json(veterinarias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/clinics/:id', async (req, res) => {
  try {
    const veterinaria = await storage.getVeterinariaById(req.params.id);
    if (!veterinaria) {
      return res.status(404).json({ error: 'Clinic not found' });
    }

    veterinaria.specialties = veterinaria.servicios.map(s => s.nombre.toUpperCase());
    veterinaria.image = veterinaria.imagen;
    veterinaria.location = veterinaria.direccion;

    res.json(veterinaria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/veterinarias', async (req, res) => {
  try {
    const { nombre, direccion, telefono, estado, rating, imagen } = req.body;

    if (!nombre || !direccion) {
      return res.status(400).json({ error: 'nombre and direccion are required' });
    }

    const veterinaria = await storage.createVeterinaria(nombre, direccion, telefono, estado, rating, imagen);
    res.status(201).json(veterinaria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/servicios', async (req, res) => {
  try {
    const servicios = await storage.getAllServicios();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/servicios', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'nombre is required' });
    }

    const servicio = await storage.createServicio(nombre, descripcion);
    res.status(201).json(servicio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/mascotas', async (req, res) => {
  try {
    const mascotas = await storage.getAllMascotas();
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/pets/:id', async (req, res) => {
  try {
    const mascota = await storage.getMascotaById(req.params.id);
    if (!mascota) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json(mascota);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/mascotas', async (req, res) => {
  try {
    const { nombre, especie, raza, edad, id_cliente } = req.body;

    if (!nombre || !especie || !id_cliente) {
      return res.status(400).json({ error: 'nombre, especie and id_cliente are required' });
    }

    const mascota = await storage.createMascota(nombre, especie, raza, edad, id_cliente);
    res.status(201).json(mascota);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/pets/:id', async (req, res) => {
  try {
    const mascota = await storage.updateMascota(req.params.id, req.body);
    res.json(mascota);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/visitas', async (req, res) => {
  try {
    const visitas = await storage.getAllVisitas();
    res.json(visitas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/visitas/mascota/:id', async (req, res) => {
  try {
    const visitas = await storage.getVisitasByMascota(req.params.id);
    res.json(visitas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/visitas', async (req, res) => {
  try {
    const { diagnostico, medicamentos, chequeos, id_mascota, id_veterinaria } = req.body;

    if (!id_mascota || !id_veterinaria) {
      return res.status(400).json({ error: 'id_mascota and id_veterinaria are required' });
    }

    const visita = await storage.createVisita(diagnostico, medicamentos, chequeos, id_mascota, id_veterinaria);
    res.status(201).json(visita);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/emergency-messages', async (req, res, next) => {
  try {
    const messages = await storage.getAllEmergencyMessages();
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

app.post('/api/emergency', validateBody(['mensaje', 'nombre_contacto', 'id_veterinaria']), async (req, res, next) => {
  try {
    const { mensaje, nombre_contacto, telefono_contacto, id_veterinaria, id_emergencia } = req.body;

    const vet = await storage.getVeterinariaById(id_veterinaria);
    if (!vet) return res.status(404).json({ error: 'Clinic not found' });

    const registro = await storage.createEmergencyMessage(
      mensaje, nombre_contacto, telefono_contacto, id_veterinaria, id_emergencia || null
    );

    let whatsappLink = null;
    if (vet.whatsapp) {
      whatsappLink = `https://wa.me/${vet.whatsapp}?text=${encodeURIComponent(`EMERGENCY - ${nombre_contacto}: ${mensaje}`)}`;
    }

    res.status(201).json({
      mensaje: registro,
      whatsappLink,
      veterinaria: { nombre: vet.nombre, telefono: vet.telefono, whatsapp: vet.whatsapp }
    });
  } catch (err) {
    next(err);
  }
});

app.get('/api/emergencias', async (req, res) => {
  try {
    const emergencias = await storage.getAllEmergencias();
    res.json(emergencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/emergencias', async (req, res) => {
  try {
    const { descripcion, id_mascota, id_veterinaria } = req.body;

    if (!descripcion || !id_mascota || !id_veterinaria) {
      return res.status(400).json({ error: 'descripcion, id_mascota and id_veterinaria are required' });
    }

    const emergencia = await storage.createEmergencia(descripcion, id_mascota, id_veterinaria);
    res.status(201).json(emergencia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:id/dashboard', async (req, res) => {
  try {
    const dashboard = await storage.getUserDashboard(req.params.id);
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const { id_mascota, id_veterinaria, fecha, motivo } = req.body;

    if (!id_mascota || !id_veterinaria) {
      return res.status(400).json({ error: 'id_mascota and id_veterinaria are required' });
    }

    const visita = await storage.createVisita(motivo || 'Scheduled appointment', null, null, id_mascota, id_veterinaria);
    res.status(201).json(visita);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const cliente = await storage.getClienteByEmail(email);
    if (!cliente || cliente.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const { password: _, ...user } = cliente;
    res.json(user);
  } catch (err) {
    next(err);
  }
});

app.get(/^\/(?!api)(?:[^.]*)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

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
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  console.log('\n\nShutting down...');
  await db.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n\nShutting down...');
  await db.close();
  process.exit(0);
});

startServer();

module.exports = app;
