/**
 * Seed script to populate the PAWS DB with sample data.
 * Note: This generates realistic-looking sample data for Medellín neighborhoods
 * but it does NOT fetch or verify data from external sources.
 * Run with: node backend/scripts/seed_database.js
 */

const db = require('../db');
const bcrypt = require('bcryptjs');

async function ensureSpecialty(name) {
  const row = await db.get('SELECT specialty_id FROM specialties WHERE name = $1', [name]);
  if (row) return row.specialty_id;
  const inserted = await db.get('INSERT INTO specialties (name) VALUES ($1) RETURNING specialty_id', [name]);
  return inserted.specialty_id;
}

async function ensureAnimalType(name) {
  const row = await db.get('SELECT animal_type_id FROM animal_types WHERE name = $1', [name]);
  if (row) return row.animal_type_id;
  const inserted = await db.get('INSERT INTO animal_types (name) VALUES ($1) RETURNING animal_type_id', [name]);
  return inserted.animal_type_id;
}

async function ensureUser({ name, email, password, phone, role = 'user' }) {
  const existing = await db.get('SELECT user_id FROM users WHERE email = $1', [email]);
  if (existing) return existing.user_id;
  const hashed = bcrypt.hashSync(password, 10);
  const row = await db.get(
    'INSERT INTO users (name, email, password, phone, role) VALUES ($1,$2,$3,$4,$5) RETURNING user_id',
    [name, email, hashed, phone, role]
  );
  return row.user_id;
}

async function createBusiness(user_id, data) {
  const exists = await db.get('SELECT business_id FROM businesses WHERE name = $1', [data.name]);
  if (exists) return exists.business_id;
  const row = await db.get(
    `INSERT INTO businesses (user_id, business_type, name, address, phone, whatsapp, email, zone, latitude, longitude, image_url, status, nit, nit_verified)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING business_id`,
    [
      user_id,
      data.business_type,
      data.name,
      data.address,
      data.phone || null,
      data.whatsapp || null,
      data.email || null,
      data.zone || null,
      data.latitude || null,
      data.longitude || null,
      data.image_url || null,
      data.status || 'active',
      data.nit || null,
      data.nit_verified || null
    ]
  );
  return row.business_id;
}

async function createClinic(business_id, data) {
  const exists = await db.get('SELECT clinic_id FROM clinics WHERE business_id = $1', [business_id]);
  if (exists) return exists.clinic_id;
  const row = await db.get(
    'INSERT INTO clinics (business_id, service_type, is_24h, rating) VALUES ($1,$2,$3,$4) RETURNING clinic_id',
    [business_id, data.service_type || 'private', data.is_24h || false, data.rating || 0]
  );
  return row.clinic_id;
}

async function addClinicSpecialty(clinic_id, specialty_id) {
  await db.run('INSERT INTO clinic_specialties (clinic_id, specialty_id) VALUES ($1,$2) ON CONFLICT DO NOTHING', [clinic_id, specialty_id]);
}

async function addClinicAnimalType(clinic_id, animal_type_id) {
  await db.run('INSERT INTO clinic_animal_types (clinic_id, animal_type_id) VALUES ($1,$2) ON CONFLICT DO NOTHING', [clinic_id, animal_type_id]);
}

async function createPet(user_id, pet) {
  const exists = await db.get('SELECT pet_id FROM pets WHERE user_id = $1 AND name = $2', [user_id, pet.name]);
  if (exists) return exists.pet_id;
  const row = await db.get(
    'INSERT INTO pets (user_id, name, species, breed, birth_date, weight_kg) VALUES ($1,$2,$3,$4,$5,$6) RETURNING pet_id',
    [user_id, pet.name, pet.species, pet.breed || null, pet.birth_date || null, pet.weight_kg || null]
  );
  return row.pet_id;
}

async function createMedicalRecord(record) {
  await db.run(
    `INSERT INTO medical_records (pet_id, clinic_id, user_id, veterinarian, visit_date, visit_type, reason, diagnosis, treatment, notes, file_url, file_original_name, file_mime_type, file_size_bytes, next_visit_date)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
    ON CONFLICT DO NOTHING`,
    [
      record.pet_id,
      record.clinic_id || null,
      record.user_id,
      record.veterinarian || null,
      record.visit_date || new Date(),
      record.visit_type,
      record.reason || null,
      record.diagnosis || null,
      record.treatment || null,
      record.notes || null,
      record.file_url || null,
      record.file_original_name || null,
      record.file_mime_type || null,
      record.file_size_bytes || null,
      record.next_visit_date || null
    ]
  );
}

async function main() {
  try {
    await db.connect();
    console.log('Connected to DB — seeding data...');

    // Ensure specialties and animal types
    const specialties = ['Urgencias','Cirugía','Ortopedia','Cardiología','Dermatología','Vacunación','Laboratorio','Dentista'];
    const specialtyIds = {};
    for (const s of specialties) {
      specialtyIds[s] = await ensureSpecialty(s);
    }

    const animalTypes = ['Dog','Cat','Bird','Rabbit'];
    const animalTypeIds = {};
    for (const a of animalTypes) {
      animalTypeIds[a] = await ensureAnimalType(a);
    }

    // Create a small set of users (owners)
    const users = [
      { name: 'Andrés Restrepo', email: 'andres.restrepo@example.com', password: 'Password123!', phone: '3001112222' },
      { name: 'Camila Montoya', email: 'camila.montoya@example.com', password: 'Password123!', phone: '3002223333' },
      { name: 'Juan Gomez', email: 'juan.gomez@example.com', password: 'Password123!', phone: '3003334444' },
      { name: 'Natalia Herrera', email: 'natalia.herrera@example.com', password: 'Password123!', phone: '3004445555' }
    ];

    const userIds = [];
    for (const u of users) {
      const id = await ensureUser(u);
      userIds.push(id);
    }

    // Create businesses (clinics) — owners assigned from users
    const clinicsData = [
      {
        owner_idx: 0,
        business_type: 'clinic',
        name: 'Clínica Veterinaria El Poblado',
        address: 'Cra. 43A #16-22, El Poblado, Medellín',
        phone: '6042567890',
        whatsapp: '573046712893',
        email: 'elpoblado@vetcare.test',
        zone: 'El Poblado',
        latitude: 6.2115,
        longitude: -75.5686,
        image_url: null,
        nit: '800123456-1',
        nit_verified: 'verified'
      },
      {
        owner_idx: 1,
        business_type: 'clinic',
        name: 'Centro Médico Veterinario Laureles',
        address: 'Cra. 76 #33-45, Laureles, Medellín',
        phone: '6043234567',
        whatsapp: '573113489205',
        email: 'laureles@vetcare.test',
        zone: 'Laureles',
        latitude: 6.2460,
        longitude: -75.5900,
        nit: '900987654-2',
        nit_verified: 'verified'
      },
      {
        owner_idx: 2,
        business_type: 'clinic',
        name: 'Veterinaria Envigado Centro',
        address: 'Cll. 38 Sur #43-12, Envigado, Antioquia',
        phone: '6044512380',
        whatsapp: '573204561738',
        email: 'envigado@vetcare.test',
        zone: 'Envigado',
        latitude: 6.1700,
        longitude: -75.5880,
        nit: '811223344-3',
        nit_verified: 'verified'
      }
    ];

    const clinicIds = [];
    for (const c of clinicsData) {
      const owner = userIds[c.owner_idx];
      const business_id = await createBusiness(owner, c);
      const clinic_id = await createClinic(business_id, { service_type: 'private', is_24h: c.name.includes('Urgencias'), rating: 4.7 });
      clinicIds.push({ clinic_id, business_id });

      // attach specialties and animal types
      await addClinicSpecialty(clinic_id, specialtyIds['Urgencias']);
      await addClinicSpecialty(clinic_id, specialtyIds['Vacunación']);
      await addClinicAnimalType(clinic_id, animalTypeIds['Dog']);
      await addClinicAnimalType(clinic_id, animalTypeIds['Cat']);
    }

    // Create pets for each user
    const pets = [
      { user_idx: 0, name: 'Bruno', species: 'Dog', breed: 'Golden Retriever', birth_date: '2020-05-12', weight_kg: 30.5 },
      { user_idx: 1, name: 'Mochi', species: 'Cat', breed: 'Persian', birth_date: '2021-08-20', weight_kg: 4.2 },
      { user_idx: 2, name: 'Coco', species: 'Dog', breed: 'French Bulldog', birth_date: '2018-01-03', weight_kg: 12.1 },
      { user_idx: 3, name: 'Nina', species: 'Cat', breed: 'Siamese', birth_date: '2022-11-11', weight_kg: 3.9 }
    ];

    const petIds = [];
    for (const p of pets) {
      const pid = await createPet(userIds[p.user_idx], p);
      petIds.push({ pet_id: pid, user_id: userIds[p.user_idx] });
    }

    // Create some medical records for pets referencing clinics
    const records = [
      {
        pet_id: petIds[0].pet_id,
        clinic_id: clinicIds[0].clinic_id,
        user_id: petIds[0].user_id,
        veterinarian: 'Dr. Camilo Rojas',
        visit_type: 'Vaccination',
        reason: 'Vacunación anual',
        diagnosis: 'Ninguna',
        treatment: 'Vacuna antirrábica',
        notes: 'Mascota en buen estado',
        file_url: null,
        file_original_name: null,
        file_mime_type: null,
        file_size_bytes: null,
        next_visit_date: '2025-05-12'
      },
      {
        pet_id: petIds[1].pet_id,
        clinic_id: clinicIds[1].clinic_id,
        user_id: petIds[1].user_id,
        veterinarian: 'Dra. Laura Gómez',
        visit_type: 'Checkup',
        reason: 'Revisión de salud general',
        diagnosis: 'Buena condición',
        treatment: 'Ninguno',
        notes: 'Peso adecuado',
        next_visit_date: null
      },
      {
        pet_id: petIds[2].pet_id,
        clinic_id: clinicIds[2].clinic_id,
        user_id: petIds[2].user_id,
        veterinarian: 'Dr. Andrés Mejía',
        visit_type: 'Deworming',
        reason: 'Desparasitación',
        diagnosis: 'Parásitos intestinales leves',
        treatment: 'Medicamento antiparasitario oral',
        notes: 'Control en 2 semanas',
        next_visit_date: null
      }
    ];

    for (const r of records) {
      await createMedicalRecord(r);
    }

    console.log('Seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

main();
