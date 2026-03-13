const express = require('express');
const cors = require('cors');
const path = require('path');

// db module handles dotenv internally, but we also load it here
// so process.env.PORT is available before db is imported
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const db = require('./storage/db');
const storage = require('./storage');
const { errorHandler, notFound, validateBody } = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
const frontendPath = path.join(__dirname, '..', 'frontend');
const rootPath = path.join(__dirname, '..');
app.use(express.static(rootPath, { etag: false, lastModified: false, setHeaders: (res) => { res.setHeader('Cache-Control', 'no-store'); } }));
app.use(express.static(frontendPath, { etag: false, lastModified: false, setHeaders: (res) => { res.setHeader('Cache-Control', 'no-store'); } }));

// ======================== HEALTH CHECK ========================

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'PAWS API running' });
});

// ======================== AUTH ========================

app.post('/api/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await storage.getUserByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Strip password before sending
    const { password: _, ...safeUser } = user;
    res.json(safeUser);
  } catch (err) {
    next(err);
  }
});

// ======================== USERS (was /api/clientes) ========================

app.get('/api/users', async (req, res, next) => {
  try {
    const users = await storage.getAllUsers();
    res.json(users);
  } catch (err) { next(err); }
});

app.get('/api/users/:id', async (req, res, next) => {
  try {
    const user = await storage.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
});

app.post('/api/users', async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email and password are required' });
    }
    const user = await storage.createUser(name, email, password, phone);
    res.status(201).json(user);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email already registered' });
    }
    next(err);
  }
});

app.put('/api/users/:id', async (req, res, next) => {
  try {
    const user = await storage.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (err) { next(err); }
});

app.get('/api/users/:id/dashboard', async (req, res, next) => {
  try {
    const dashboard = await storage.getUserDashboard(req.params.id);
    res.json(dashboard);
  } catch (err) { next(err); }
});

// ======================== CLINICS (was /api/clinics but now uses new schema) ========================

app.get('/api/clinics', async (req, res, next) => {
  try {
    const { location } = req.query;
    let clinics;

    if (location) {
      clinics = await storage.getClinicsByLocation(location);
    } else {
      clinics = await storage.getAllClinics();
    }

    // Add convenience fields for the frontend
    // (the frontend used to expect "specialties" as uppercase strings, "image", "location")
    clinics = clinics.map(c => ({
      ...c,
      specialties_list: c.specialties.map(s => s.name.toUpperCase()),
      image: c.image_url,
      location: c.address
    }));

    res.json(clinics);
  } catch (err) { next(err); }
});

app.get('/api/clinics/:id', async (req, res, next) => {
  try {
    const clinic = await storage.getClinicById(req.params.id);
    if (!clinic) return res.status(404).json({ error: 'Clinic not found' });

    clinic.specialties_list = clinic.specialties.map(s => s.name.toUpperCase());
    clinic.image = clinic.image_url;
    clinic.location = clinic.address;

    res.json(clinic);
  } catch (err) { next(err); }
});

app.post('/api/clinics', async (req, res, next) => {
  try {
    const { user_id, name, address } = req.body;
    if (!user_id || !name || !address) {
      return res.status(400).json({ error: 'user_id, name and address are required' });
    }
    const clinic = await storage.createClinic(req.body);
    res.status(201).json(clinic);
  } catch (err) { next(err); }
});

// ======================== SPECIALTIES (was /api/servicios) ========================

app.get('/api/specialties', async (req, res, next) => {
  try {
    const specialties = await storage.getAllSpecialties();
    res.json(specialties);
  } catch (err) { next(err); }
});

app.post('/api/specialties', async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });
    const specialty = await storage.createSpecialty(name);
    res.status(201).json(specialty);
  } catch (err) { next(err); }
});

// ======================== PETS (was /api/mascotas) ========================

app.get('/api/pets', async (req, res, next) => {
  try {
    const pets = await storage.getAllPets();
    res.json(pets);
  } catch (err) { next(err); }
});

app.get('/api/pets/:id', async (req, res, next) => {
  try {
    const pet = await storage.getPetById(req.params.id);
    if (!pet) return res.status(404).json({ error: 'Pet not found' });
    res.json(pet);
  } catch (err) { next(err); }
});

app.post('/api/pets', async (req, res, next) => {
  try {
    const { name, species, user_id } = req.body;
    if (!name || !species || !user_id) {
      return res.status(400).json({ error: 'name, species and user_id are required' });
    }
    const pet = await storage.createPet(req.body);
    res.status(201).json(pet);
  } catch (err) { next(err); }
});

app.put('/api/pets/:id', async (req, res, next) => {
  try {
    const pet = await storage.updatePet(req.params.id, req.body);
    res.json(pet);
  } catch (err) { next(err); }
});

// ======================== MEDICAL RECORDS (was /api/visitas) ========================

app.get('/api/medical-records', async (req, res, next) => {
  try {
    const records = await storage.getAllRecords();
    res.json(records);
  } catch (err) { next(err); }
});

app.get('/api/medical-records/pet/:id', async (req, res, next) => {
  try {
    const records = await storage.getRecordsByPet(req.params.id);
    res.json(records);
  } catch (err) { next(err); }
});

app.post('/api/medical-records', async (req, res, next) => {
  try {
    const { pet_id, clinic_id } = req.body;
    if (!pet_id || !clinic_id) {
      return res.status(400).json({ error: 'pet_id and clinic_id are required' });
    }
    const record = await storage.createRecord(req.body);
    res.status(201).json(record);
  } catch (err) { next(err); }
});

// Convenience alias — booking an appointment creates a medical record
app.post('/api/appointments', async (req, res, next) => {
  try {
    const { pet_id, clinic_id, reason } = req.body;
    if (!pet_id || !clinic_id) {
      return res.status(400).json({ error: 'pet_id and clinic_id are required' });
    }
    const record = await storage.createRecord({
      pet_id,
      clinic_id,
      visit_type: 'appointment',
      reason: reason || 'Scheduled appointment'
    });
    res.status(201).json(record);
  } catch (err) { next(err); }
});

// ======================== EMERGENCIES (was /api/emergencias) ========================

app.get('/api/emergencies', async (req, res, next) => {
  try {
    const emergencies = await storage.getAllEmergencies();
    res.json(emergencies);
  } catch (err) { next(err); }
});

app.post('/api/emergencies', async (req, res, next) => {
  try {
    const { description, pet_id, business_id } = req.body;
    if (!description || !pet_id || !business_id) {
      return res.status(400).json({ error: 'description, pet_id and business_id are required' });
    }
    const emergency = await storage.createEmergency(description, pet_id, business_id);
    res.status(201).json(emergency);
  } catch (err) { next(err); }
});

// ======================== EMERGENCY MESSAGES ========================

app.get('/api/emergency-messages', async (req, res, next) => {
  try {
    const messages = await storage.getAllEmergencyMessages();
    res.json(messages);
  } catch (err) { next(err); }
});

app.post('/api/emergency-messages',
  validateBody(['message', 'contact_name', 'business_id']),
  async (req, res, next) => {
    try {
      const { message, contact_name, contact_phone, business_id, emergency_id } = req.body;

      // Look up business to get whatsapp number
      const business = await storage.getBusinessById(business_id);
      if (!business) return res.status(404).json({ error: 'Business not found' });

      const record = await storage.createEmergencyMessage({
        message, contact_name, contact_phone, business_id, emergency_id
      });

      let whatsappLink = null;
      if (business.whatsapp) {
        whatsappLink = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(`EMERGENCY - ${contact_name}: ${message}`)}`;
      }

      res.status(201).json({
        message: record,
        whatsappLink,
        business: { name: business.name, phone: business.phone, whatsapp: business.whatsapp }
      });
    } catch (err) { next(err); }
  }
);

// ======================== SPA FALLBACK ========================

// Any non-API GET request serves index.html (for the frontend hash router)
app.get(/^\/(?!api)(?:[^.]*)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ======================== ERROR HANDLING ========================

app.use(notFound);
app.use(errorHandler);

// ======================== START SERVER ========================

async function startServer() {
  try {
    await db.initialize();
    app.listen(PORT, () => {
      console.log(`\n========================================`);
      console.log(` PAWS server started`);
      console.log(` URL: http://localhost:${PORT}`);
      console.log(` API: http://localhost:${PORT}/api/health`);
      console.log(`========================================\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  console.log('\nShutting down...');
  await db.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await db.close();
  process.exit(0);
});

startServer();

module.exports = app;
