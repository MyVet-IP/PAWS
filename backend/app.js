// Servidor Express para la API de VetCare
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const storage = require('./storage');
const { errorHandler, notFound, validateBody } = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del frontend y raíz
const frontendPath = path.join(__dirname, '..', 'frontend');
const rootPath = path.join(__dirname, '..');
app.use(express.static(rootPath));
app.use(express.static(frontendPath));

// === RUTAS DE HEALTH CHECK ===

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'API funcionando correctamente' });
});

// === RUTAS DE CLIENTES ===

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
      return res.status(404).json({ error: 'Cliente no encontrado' });
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
      return res.status(400).json({ error: 'nombre, email y password son obligatorios' });
    }
    
    const cliente = await storage.createCliente(nombre, email, password, telefono);
    res.status(201).json(cliente);
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'El email ya está registrado' });
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

// === RUTAS DE VETERINARIAS/CLÍNICAS ===

app.get('/api/clinics', async (req, res) => {
  try {
    const { location } = req.query;
    
    let veterinarias;
    if (location) {
      veterinarias = await storage.getVeterinariasByLocation(location);
    } else {
      veterinarias = await storage.getAllVeterinarias();
    }
    
    // Formatear servicios como array de nombres
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
      return res.status(404).json({ error: 'Veterinaria no encontrada' });
    }
    
    // Formatear para compatibilidad con frontend
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
      return res.status(400).json({ error: 'nombre y direccion son obligatorios' });
    }
    
    const veterinaria = await storage.createVeterinaria(nombre, direccion, telefono, estado, rating, imagen);
    res.status(201).json(veterinaria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// === RUTAS DE SERVICIOS ===

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
      return res.status(400).json({ error: 'nombre es obligatorio' });
    }
    
    const servicio = await storage.createServicio(nombre, descripcion);
    res.status(201).json(servicio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// === RUTAS DE MASCOTAS ===

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
      return res.status(404).json({ error: 'Mascota no encontrada' });
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
      return res.status(400).json({ error: 'nombre, especie e id_cliente son obligatorios' });
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

// === RUTAS DE VISITAS ===

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
      return res.status(400).json({ error: 'id_mascota e id_veterinaria son obligatorios' });
    }
    
    const visita = await storage.createVisita(diagnostico, medicamentos, chequeos, id_mascota, id_veterinaria);
    res.status(201).json(visita);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// === RUTAS DE EMERGENCY MESSAGES ===

app.get('/api/emergency-messages', async (req, res, next) => {
  try {
    const messages = await storage.getAllEmergencyMessages();
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

// POST /api/emergency — guarda emergencia + mensaje + genera link WhatsApp
app.post('/api/emergency', validateBody(['mensaje', 'nombre_contacto', 'id_veterinaria']), async (req, res, next) => {
  try {
    const { mensaje, nombre_contacto, telefono_contacto, id_veterinaria, id_emergencia } = req.body;

    // Obtener datos de la clínica para el link de WhatsApp
    const veterinaria = await storage.getVeterinariaById(id_veterinaria);
    if (!veterinaria) {
      return res.status(404).json({ error: 'Clínica no encontrada' });
    }

    // Guardar el mensaje en la base de datos
    const emergencyMsg = await storage.createEmergencyMessage(
      mensaje, nombre_contacto, telefono_contacto, id_veterinaria, id_emergencia || null
    );

    // Generar link de WhatsApp si la clínica tiene número
    let whatsappLink = null;
    if (veterinaria.whatsapp) {
      const texto = encodeURIComponent(`[EMERGENCIA] ${nombre_contacto}: ${mensaje}`);
      whatsappLink = `https://wa.me/${veterinaria.whatsapp}?text=${texto}`;
    }

    res.status(201).json({
      mensaje: emergencyMsg,
      whatsappLink,
      veterinaria: {
        nombre: veterinaria.nombre,
        telefono: veterinaria.telefono,
        whatsapp: veterinaria.whatsapp
      }
    });
  } catch (error) {
    next(error);
  }
});

// === RUTAS DE EMERGENCIAS ===

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
      return res.status(400).json({ error: 'descripcion, id_mascota e id_veterinaria son obligatorios' });
    }
    
    const emergencia = await storage.createEmergencia(descripcion, id_mascota, id_veterinaria);
    res.status(201).json(emergencia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// === RUTAS DE DASHBOARD ===

app.get('/api/users/:id/dashboard', async (req, res) => {
  try {
    const dashboard = await storage.getUserDashboard(req.params.id);
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// === RUTA DE CITAS/APPOINTMENTS ===

app.post('/api/appointments', async (req, res) => {
  try {
    // Crear una visita como cita
    const { id_mascota, id_veterinaria, fecha, motivo } = req.body;
    
    if (!id_mascota || !id_veterinaria) {
      return res.status(400).json({ error: 'id_mascota e id_veterinaria son obligatorios' });
    }
    
    const visita = await storage.createVisita(motivo || 'Cita programada', null, null, id_mascota, id_veterinaria);
    res.status(201).json(visita);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// === RUTA PARA SERVIR EL FRONTEND ===

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// === MIDDLEWARE DE MANEJO DE ERRORES ===

app.use(notFound);
app.use(errorHandler);

// === INICIALIZACIÓN DEL SERVIDOR ===

async function startServer() {
  try {
    // Inicializar la base de datos
    await db.initialize();
    
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`\n========================================`);
      console.log(`🐾 Servidor VetCare iniciado`);
      console.log(`📍 URL: http://localhost:${PORT}`);
      console.log(`📊 API: http://localhost:${PORT}/api/health`);
      console.log(`========================================\n`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

// Manejar cierre graceful
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

// Iniciar el servidor
startServer();

module.exports = app;
