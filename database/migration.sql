INSERT INTO users (name, email, password, phone, role, created_at)
SELECT
  nombre,
  email,
  password,
  telefono,
  CASE
    WHEN role IN ('admin', 'user', 'business') THEN role
    WHEN role IN ('owner', 'business_owner', 'vet', 'staff', 'shelter_staff') THEN 'business'
    ELSE 'user'
  END,
  NOW()
FROM clientes
ORDER BY id_cliente;

INSERT INTO businesses (user_id, business_type, name, address, phone, whatsapp, zone, latitude, longitude, image_url, status, created_at)
SELECT
  1,               -- assign to admin user
  'clinic',
  nombre,
  direccion,
  telefono,
  whatsapp,
  zone,
  latitude,
  longitude,
  imagen,
  COALESCE(estado, 'active'),
  NOW()
FROM veterinarias
ORDER BY id_veterinaria;

INSERT INTO clinics (business_id, service_type, is_24h, rating)
SELECT
  b.business_id,
  COALESCE(v.service_type, 'public'),
  COALESCE(v.is_24h, FALSE),
  COALESCE(v.rating, 0)
FROM veterinarias v
JOIN businesses b ON b.name = v.nombre AND b.business_type = 'clinic';

INSERT INTO pets (user_id, name, species, breed, birth_date, weight_kg, created_at)
SELECT
  id_cliente + 1,  -- offset because admin is user_id=1
  nombre,
  especie,
  raza,
  CASE WHEN edad IS NOT NULL
    THEN (CURRENT_DATE - (edad || ' years')::INTERVAL)::DATE
    ELSE NULL
  END,
  NULL,  
  NOW()
FROM mascotas
ORDER BY id_mascota;

INSERT INTO medical_records (pet_id, clinic_id, user_id, visit_date, visit_type, diagnosis, treatment, notes, created_at)
SELECT
  v.id_mascota,        -- pet IDs might need adjustment too if they changed
  c.clinic_id,
  p.user_id,           -- the pet's owner
  v.fecha,
  'general',
  v.diagnostico,
  v.medicamentos,
  v.chequeos,
  v.fecha
FROM visitas v
JOIN pets p ON p.pet_id = v.id_mascota
JOIN businesses b ON b.name = (SELECT nombre FROM veterinarias WHERE id_veterinaria = v.id_veterinaria)
JOIN clinics c ON c.business_id = b.business_id;

-- STEP 5: emergencias → emergencies
INSERT INTO emergencies (pet_id, business_id, description, status, created_at)
SELECT
  e.id_mascota,
  b.business_id,
  e.descripcion,
  'resolved',
  e.fecha
FROM emergencias e
JOIN businesses b ON b.name = (SELECT nombre FROM veterinarias WHERE id_veterinaria = e.id_veterinaria);

-- STEP 6: emergency_messages → emergency_messages (column renames)
INSERT INTO emergency_messages (business_id, emergency_id, message, contact_name, contact_phone, channel, status, created_at)
SELECT
  b.business_id,
  em.id_emergencia,
  em.mensaje,
  em.nombre_contacto,
  em.telefono_contacto,
  COALESCE(em.canal, 'whatsapp'),
  COALESCE(em.status, 'pending'),
  em.fecha
FROM emergency_messages em
JOIN businesses b ON b.name = (SELECT nombre FROM veterinarias WHERE id_veterinaria = em.id_veterinaria);

-- STEP 7: vet_specialties → clinic_specialties
INSERT INTO clinic_specialties (clinic_id, specialty_id)
SELECT c.clinic_id, vs.id_specialty
FROM vet_specialties vs
JOIN businesses b ON b.name = (SELECT nombre FROM veterinarias WHERE id_veterinaria = vs.id_veterinaria)
JOIN clinics c ON c.business_id = b.business_id;

-- STEP 8: vet_animal_types → clinic_animal_types
INSERT INTO clinic_animal_types (clinic_id, animal_type_id)
SELECT c.clinic_id, vat.id_animal_type
FROM vet_animal_types vat
JOIN businesses b ON b.name = (SELECT nombre FROM veterinarias WHERE id_veterinaria = vat.id_veterinaria)
JOIN clinics c ON c.business_id = b.business_id;

-- STEP 9: schedules (just update the FK name)
INSERT INTO schedules (business_id, day_of_week, open_time, close_time, is_open)
SELECT
  b.business_id,
  s.day_of_week,
  s.open_time,
  s.close_time,
  s.is_open
FROM schedules s
JOIN businesses b ON b.name = (SELECT nombre FROM veterinarias WHERE id_veterinaria = s.id_veterinaria);

-- STEP 10: Copy catalog tables (same structure, just make sure they exist)
INSERT INTO specialties (name)
SELECT name FROM specialties ON CONFLICT (name) DO NOTHING;

INSERT INTO animal_types (name)
SELECT name FROM animal_types ON CONFLICT (name) DO NOTHING;

