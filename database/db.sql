por favor
--  PAWS Database Schema - PostgreSQL

BEGIN;

--  USERS

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(30),
  role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'business', 'admin')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


--  BUSINESSES

CREATE TABLE IF NOT EXISTS businesses (
  business_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  business_type VARCHAR(20) NOT NULL CHECK (business_type IN ('clinic','daycare','shelter','petshop','vet','dog_walker')),
  name VARCHAR(140) NOT NULL,
  address VARCHAR(200),
  phone VARCHAR(30),
  whatsapp VARCHAR(30),
  email VARCHAR(180),
  zone VARCHAR(100),
  city VARCHAR(100),
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  website VARCHAR(500),
  image_url VARCHAR(500),
  rating_average DECIMAL(3,2) DEFAULT 0.00,
  rating_count INTEGER DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','draft')),
  nit VARCHAR(20),
  nit_verified VARCHAR(20) CHECK (nit_verified IN ('pending','verified','rejected')),
  nit_verified_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  -- NIT constraint enforced (draft status allows NULL NIT for onboarding)
  CONSTRAINT chk_nit_required CHECK (
    (business_type = 'dog_walker' AND nit IS NULL AND nit_verified IS NULL)
    OR
    (status = 'draft')
    OR
    (business_type <> 'dog_walker' AND nit IS NOT NULL)
  ),

  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

--  SPECIALTIES  (catalog - used by clinics and vets)

CREATE TABLE IF NOT EXISTS specialties (
  specialty_id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE
);

--  ANIMAL TYPES  (catalog - used by clinics and vets)

CREATE TABLE IF NOT EXISTS animal_types (
  animal_type_id SERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE
);


--  SCHEDULES

CREATE TABLE IF NOT EXISTS schedules (
  schedule_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL,
  day_of_week VARCHAR(10) NOT NULL CHECK (day_of_week IN ('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday')),
  open_time TIME,
  close_time TIME,
  is_open BOOLEAN DEFAULT TRUE,
  UNIQUE (business_id, day_of_week),
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE CASCADE
);


--  CLINICS

CREATE TABLE IF NOT EXISTS clinics (
  clinic_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL UNIQUE,
  service_type VARCHAR(20) DEFAULT 'private' CHECK (service_type IN ('public','private')),
  rating DECIMAL(2,1),
  is_24h BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS clinic_specialties (
  clinic_id INTEGER NOT NULL,
  specialty_id INTEGER NOT NULL,
  PRIMARY KEY (clinic_id, specialty_id),
  FOREIGN KEY (clinic_id) REFERENCES clinics(clinic_id) ON DELETE CASCADE,
  FOREIGN KEY (specialty_id) REFERENCES specialties(specialty_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS clinic_animal_types (
  clinic_id INTEGER NOT NULL,
  animal_type_id INTEGER NOT NULL,
  PRIMARY KEY (clinic_id, animal_type_id),
  FOREIGN KEY (clinic_id) REFERENCES clinics(clinic_id) ON DELETE CASCADE,
  FOREIGN KEY (animal_type_id) REFERENCES animal_types(animal_type_id) ON DELETE CASCADE
);


--  VETS 

CREATE TABLE IF NOT EXISTS vets (
  vet_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL UNIQUE,
  license_number VARCHAR(60),  -- Professional veterinary license
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vet_specialties (
  vet_id INTEGER NOT NULL,
  specialty_id INTEGER NOT NULL,
  PRIMARY KEY (vet_id, specialty_id),
  FOREIGN KEY (vet_id) REFERENCES vets(vet_id) ON DELETE CASCADE,
  FOREIGN KEY (specialty_id) REFERENCES specialties(specialty_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vet_animal_types (
  vet_id INTEGER  NOT NULL,
  animal_type_id INTEGER NOT NULL,
  PRIMARY KEY (vet_id, animal_type_id),
  FOREIGN KEY (vet_id) REFERENCES vets(vet_id) ON DELETE CASCADE,
  FOREIGN KEY (animal_type_id) REFERENCES animal_types(animal_type_id) ON DELETE CASCADE
);


--  PETSHOPS  
CREATE TABLE IF NOT EXISTS petshops (
  petshop_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE CASCADE
);


--  DOG WALKERS  
--  Natural persons — no NIT required.
CREATE TABLE IF NOT EXISTS dog_walkers (
  walker_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL UNIQUE,
  bio TEXT,
  service_area VARCHAR(200),  -- Neighborhoods / zones they cover
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE CASCADE
);


--  DAYCARES  
CREATE TABLE IF NOT EXISTS daycares (
  daycare_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE CASCADE
);


--  DAYCARE SLOTS


CREATE TABLE IF NOT EXISTS daycare_slots (
  slot_id SERIAL PRIMARY KEY,
  daycare_id INTEGER NOT NULL,
  day_of_week VARCHAR(10) NOT NULL CHECK (day_of_week IN ('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday')),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  is_active BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (daycare_id) REFERENCES daycares(daycare_id) ON DELETE CASCADE
);



--  PETS 

CREATE TABLE IF NOT EXISTS pets (
  pet_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name VARCHAR(120) NOT NULL,
  animal_type_id INTEGER NOT NULL,
  breed VARCHAR(100),
  birth_date DATE,
  weight_kg DECIMAL(5,2),
  gender VARCHAR(10),
  color VARCHAR(80),
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (animal_type_id) REFERENCES animal_types(animal_type_id) ON DELETE CASCADE
);



--  DAYCARE BOOKINGS

CREATE TABLE IF NOT EXISTS daycare_bookings (
  booking_id SERIAL PRIMARY KEY,
  slot_id INTEGER NOT NULL,
  pet_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  booking_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','confirmed','completed','cancelled','no_show')),
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (slot_id) REFERENCES daycare_slots(slot_id) ON DELETE RESTRICT,
  FOREIGN KEY (pet_id) REFERENCES pets(pet_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE RESTRICT
);


--  SHELTERS  

CREATE TABLE IF NOT EXISTS shelters (
  shelter_id SERIAL PRIMARY KEY,
  business_id INTEGER  NOT NULL UNIQUE,
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE CASCADE
);


--  SHELTER PETS 

CREATE TABLE IF NOT EXISTS shelter_pets (
  shelter_pet_id SERIAL PRIMARY KEY,
  shelter_id INTEGER NOT NULL,
  name VARCHAR(120) NOT NULL,
  species VARCHAR(80) NOT NULL,
  breed VARCHAR(100),
  birth_date DATE,
  weight_kg DECIMAL(5,2),
  gender VARCHAR(10) CHECK (gender IN ('male','female','unknown')),
  description TEXT,
  image_url VARCHAR(500),
  status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available','reserved','adopted','deceased')),
  intake_date DATE NOT NULL DEFAULT CURRENT_DATE,
  intake_reason VARCHAR(100) CHECK (intake_reason IN ('rescued','surrendered','stray','transferred','other')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (shelter_id) REFERENCES shelters(shelter_id) ON DELETE RESTRICT
);


--  ADOPTIONS

CREATE TABLE IF NOT EXISTS adoptions (
  adoption_id SERIAL PRIMARY KEY,
  shelter_id INTEGER NOT NULL,
  shelter_pet_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  pet_id INTEGER NOT NULL,  -- New row in pets created at adoption
  adoption_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (shelter_id) REFERENCES shelters(shelter_id) ON DELETE RESTRICT,
  FOREIGN KEY (shelter_pet_id) REFERENCES shelter_pets(shelter_pet_id) ON DELETE RESTRICT,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE RESTRICT,
  FOREIGN KEY (pet_id) REFERENCES pets(pet_id) ON DELETE RESTRICT
);



--  MEDICAL RECORDS

CREATE TABLE IF NOT EXISTS medical_records (
  record_id SERIAL PRIMARY KEY,
  pet_id INTEGER NOT NULL,
  clinic_id INTEGER,                -- NULL = uploaded by owner, no clinic
  user_id INTEGER NOT NULL,
  veterinarian VARCHAR(120),
  visit_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  visit_type VARCHAR(60) NOT NULL CHECK (visit_type IN ('Checkup','Vaccination','Surgery','Deworming','Dental','Emergency','Follow-up','Grooming','Other')),
  reason TEXT,
  diagnosis TEXT,
  treatment TEXT,
  notes TEXT,

  -- Attached file
  file_url VARCHAR(500),
  file_original_name VARCHAR(255),
  file_mime_type VARCHAR(80),
  file_size_bytes INTEGER,

  next_visit_date DATE,
  follow_up_notes TEXT,

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (pet_id) REFERENCES pets(pet_id) ON DELETE CASCADE,
  FOREIGN KEY (clinic_id) REFERENCES clinics(clinic_id) ON DELETE SET NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE RESTRICT
);



--  EMERGENCIES

CREATE TABLE IF NOT EXISTS emergencies (
  emergency_id SERIAL PRIMARY KEY,
  pet_id INTEGER NOT NULL,
  business_id INTEGER NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open','in_progress','resolved')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(pet_id) ON DELETE CASCADE,
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE RESTRICT
);


--  EMERGENCY MESSAGES

CREATE TABLE IF NOT EXISTS emergency_messages (
  message_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL,
  emergency_id INTEGER,
  message TEXT NOT NULL,
  contact_name VARCHAR(120) NOT NULL,
  contact_phone VARCHAR(30),
  channel VARCHAR(30) DEFAULT 'whatsapp' CHECK (channel IN ('whatsapp','sms','email','call')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','sent','resolved')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE RESTRICT,
  FOREIGN KEY (emergency_id) REFERENCES emergencies(emergency_id) ON DELETE SET NULL
);



--  TRIGGER — auto-update medical_records.updated_at

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_medical_records_updated_at ON medical_records;
CREATE TRIGGER trg_medical_records_updated_at
BEFORE UPDATE ON medical_records
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Apointments

CREATE TABLE IF NOT EXISTS appointments (
  appointment_id SERIAL PRIMARY KEY,
  user_id        INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  business_id    INTEGER NOT NULL REFERENCES businesses(business_id) ON DELETE RESTRICT,
  pet_id         INTEGER NOT NULL REFERENCES pets(pet_id) ON DELETE CASCADE,
  date           DATE NOT NULL,
  time           TIME NOT NULL,
  status         VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','completed','cancelled','no_show')),
  notes          TEXT,
  created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER NOT NULL,
  token      VARCHAR(512) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reviews (
  review_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL REFERENCES businesses(business_id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(business_id, user_id)
);

--  INDEXES

-- users
CREATE INDEX IF NOT EXISTS idx_businesses_user ON businesses(user_id);
CREATE INDEX IF NOT EXISTS idx_businesses_type ON businesses(business_type);
CREATE INDEX IF NOT EXISTS idx_businesses_zone ON businesses(zone);
-- map queries: find businesses near a location
CREATE INDEX IF NOT EXISTS idx_businesses_location ON businesses(latitude, longitude);

-- schedules
CREATE INDEX IF NOT EXISTS idx_schedules_business ON schedules(business_id);

-- clinics
CREATE INDEX IF NOT EXISTS idx_clinic_specialties ON clinic_specialties(clinic_id);
CREATE INDEX IF NOT EXISTS idx_clinic_animal_types ON clinic_animal_types(clinic_id);

-- vets
CREATE INDEX IF NOT EXISTS idx_vet_specialties ON vet_specialties(vet_id);
CREATE INDEX IF NOT EXISTS idx_vet_animal_types ON vet_animal_types(vet_id);

-- pets
CREATE INDEX IF NOT EXISTS idx_pets_user ON pets(user_id);

-- medical records
CREATE INDEX IF NOT EXISTS idx_medical_records_pet ON medical_records(pet_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_clinic ON medical_records(clinic_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_user ON medical_records(user_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_date ON medical_records(visit_date);

-- daycare
CREATE INDEX IF NOT EXISTS idx_daycare_slots_daycare ON daycare_slots(daycare_id);
CREATE INDEX IF NOT EXISTS idx_daycare_bookings_slot ON daycare_bookings(slot_id);
CREATE INDEX IF NOT EXISTS idx_daycare_bookings_date ON daycare_bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_daycare_bookings_pet ON daycare_bookings(pet_id);
CREATE INDEX IF NOT EXISTS idx_daycare_bookings_user ON daycare_bookings(user_id);

-- shelters
CREATE INDEX IF NOT EXISTS idx_shelter_pets_shelter ON shelter_pets(shelter_id);
-- partial index: only indexes pets that are actually available — keeps it small and fast
CREATE INDEX IF NOT EXISTS idx_shelter_pets_available ON shelter_pets(shelter_id)
  WHERE status = 'available';

-- adoptions
CREATE INDEX IF NOT EXISTS idx_adoptions_shelter ON adoptions(shelter_id);
CREATE INDEX IF NOT EXISTS idx_adoptions_user ON adoptions(user_id);
CREATE INDEX IF NOT EXISTS idx_adoptions_pet ON adoptions(pet_id);

-- emergencies
CREATE INDEX IF NOT EXISTS idx_emergencies_pet ON emergencies(pet_id);
CREATE INDEX IF NOT EXISTS idx_emergencies_business ON emergencies(business_id);
CREATE INDEX IF NOT EXISTS idx_emergency_msg_business ON emergency_messages(business_id);
CREATE INDEX IF NOT EXISTS idx_emergency_msg_emergency ON emergency_messages(emergency_id);

-- apointments
CREATE INDEX IF NOT EXISTS idx_appointments_user ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_pet ON appointments(pet_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date, business_id); 

CREATE INDEX IF NOT EXISTS idx_reviews_business ON reviews(business_id);

--  PAWS — Seed data completo


--  1. USERS


INSERT INTO users (name, email, password, phone, role) VALUES
  ('Admin PAWS',      'admin@paws.local',           '123456', NULL,         'admin'),
  ('Andres Restrepo', 'andres.restrepo@gmail.com',  '123456', '3046712893', 'user'),
  ('Camila Montoya',  'camila.montoya@hotmail.com', '123456', '3113489205', 'user'),
  ('Juan Gomez',      'juangomez94@gmail.com',      '123456', '3204561738', 'user'),
  ('Natalia Herrera', 'nherrera.med@outlook.com',   '123456', '3157823046', 'user')
ON CONFLICT (email) DO NOTHING;


--  2. ANIMAL TYPES


INSERT INTO animal_types (name) VALUES
  ('Dog'), ('Cat'), ('Bird'), ('Rabbit'), ('Exotic'), ('Reptile'), ('Fish')
ON CONFLICT (name) DO NOTHING;


--  3. SPECIALTIES


INSERT INTO specialties (name) VALUES
  ('Vaccination'), ('Grooming'), ('Surgery'), ('X-Ray'), ('Dental'),
  ('Cardiology'), ('Laboratory'), ('Physiotherapy'), ('Emergency'), ('Boarding')
ON CONFLICT (name) DO NOTHING;


--  4. BUSINESSES


INSERT INTO businesses (user_id, business_type, name, address, phone, whatsapp, email, zone, city, latitude, longitude, image_url, status, nit, nit_verified) VALUES
  -- Clínicas (business_id 1-8)
  (1, 'clinic', 'Clinica Veterinaria El Poblado',     'Cra. 43A #16-22, El Poblado',   '6042567890', '573193052287', 'elpoblado@vetpaws.co',   'El Poblado',    'Medellín', 6.2086, -75.5659, './frontend/assets/images/lllll.jpg', 'active', '900111001-1', 'verified'),
  (1, 'clinic', 'Centro Medico Veterinario Laureles', 'Cra. 76 #33-45, Laureles',      '6043234567', '573193052287', 'laureles@vetpaws.co',    'Laureles',      'Medellín', 6.2442, -75.5906, './frontend/assets/images/lllll.jpg', 'active', '900111002-2', 'verified'),
  (1, 'clinic', 'Veterinaria Envigado',               'Cll. 38 Sur #43-12, Envigado',  '6044512380', '573193052287', 'envigado@vetpaws.co',    'Envigado',      'Envigado', 6.1700, -75.5920, './frontend/assets/images/lllll.jpg', 'active', '900111003-3', 'verified'),
  (1, 'clinic', 'Clinica Animal Belen',               'Cra. 76 #50-23, Belen',         '6043987654', '573193052287', 'belen@vetpaws.co',       'Belen',         'Medellín', 6.2364, -75.6108, './frontend/assets/images/lllll.jpg', 'active', '900111004-4', 'verified'),
  (1, 'clinic', 'VetSalud Sabaneta',                  'Cll. 77 Sur #43-10, Sabaneta',  '6044678901', '573193052287', 'sabaneta@vetpaws.co',    'Sabaneta',      'Sabaneta', 6.1516, -75.6149, './frontend/assets/images/lllll.jpg', 'active', '900111005-5', 'verified'),
  (1, 'clinic', 'Veterinaria Bello Norte',            'Cra. 50 #45-67, Bello',         '6044234567', '573193052287', 'bello@vetpaws.co',       'Bello',         'Bello',    6.3295, -75.5593, './frontend/assets/images/lllll.jpg', 'active', '900111006-6', 'verified'),
  (1, 'clinic', 'Clinica Veterinaria Robledo',        'Cra. 80 #65-12, Robledo',       '6042901234', '573193052287', 'robledo@vetpaws.co',     'Robledo',       'Medellín', 6.2722, -75.6100, './frontend/assets/images/lllll.jpg', 'active', '900111007-7', 'verified'),
  (1, 'clinic', 'Veterinaria La Candelaria',          'Cll. 44 #52-25, La Candelaria', '6042512345', '573193052287', 'candelaria@vetpaws.co',  'La Candelaria', 'Medellín', 6.2518, -75.5636, './frontend/assets/images/lllll.jpg', 'active', '900111008-8', 'verified'),
  (2, 'shelter', 'Refugio Patitas Felices',           'Cll. 30 #80-15, Robledo',       '6042111222', '573201112222', 'refugio@patitas.co',     'Robledo',       'Medellín', 6.2680, -75.6080, './frontend/assets/images/lllll.jpg', 'active', '900222001-1', 'verified'),
  (3, 'petshop', 'Pet Store Laureles',               'Cra. 73 #44-20, Laureles',       '6043555666', '573205556666', 'tienda@petstore.co',     'Laureles',      'Medellín', 6.2460, -75.5880, './frontend/assets/images/lllll.jpg', 'active', '900333001-1', 'verified'),
  (4, 'daycare', 'Guarderia Caniland',               'Cra. 65 #34-10, Laureles',       '6043777888', '573207778888', 'guarderia@caniland.co',  'Laureles',      'Medellín', 6.2430, -75.5950, './frontend/assets/images/lllll.jpg', 'active', '900444001-1', 'verified'),
  (5, 'dog_walker', 'Carlos Paseos Caninos',         'Cll. 10 #43-55, El Poblado',     '3158889900', '573158889900', 'carlos@paseos.co',       'El Poblado',    'Medellín', 6.2100, -75.5700, NULL,                                 'active', NULL, NULL),
  (1, 'vet', 'Dr. Ramirez Veterinario',              'Cra. 43 #18-30, El Poblado',     '6042999000', '573209990000', 'dramirez@vet.co',        'El Poblado',    'Medellín', 6.2090, -75.5670, './frontend/assets/images/lllll.jpg', 'active', '900555001-1', 'verified')
ON CONFLICT DO NOTHING;


--  5. CLINICS 

INSERT INTO clinics (business_id, service_type, is_24h, rating) VALUES
  (1, 'private', TRUE,  4.9),
  (2, 'private', FALSE, 4.8),
  (3, 'public',  TRUE,  5.0),
  (4, 'public',  FALSE, 4.7),
  (5, 'private', FALSE, 4.6),
  (6, 'public',  FALSE, 4.4),
  (7, 'public',  FALSE, 4.5),
  (8, 'public',  TRUE,  4.3)
ON CONFLICT DO NOTHING;


--  6. SHELTER 

INSERT INTO shelters (business_id) VALUES (9)
ON CONFLICT DO NOTHING;


--  7. PETSHOP 

INSERT INTO petshops (business_id) VALUES (10)
ON CONFLICT DO NOTHING;


--  8. DAYCARE 

INSERT INTO daycares (business_id) VALUES (11)
ON CONFLICT DO NOTHING;


--  9. DOG WALKER 

INSERT INTO dog_walkers (business_id, bio, service_area) VALUES
  (12, 'Paseador certificado con 5 años de experiencia. Grupos máximo de 4 perros.','El Poblado, Laureles, Envigado')
ON CONFLICT DO NOTHING;


--  10. VETS 

INSERT INTO vets (business_id, license_number) VALUES
  (13, 'VET-COL-2019-04521')
ON CONFLICT DO NOTHING;


--  11. CLINIC SPECIALTIES

INSERT INTO clinic_specialties (clinic_id, specialty_id) VALUES
  (1, 3), (1, 4), (1, 5), (1, 9),
  (2, 6), (2, 1), (2, 7),
  (3, 7), (3, 8), (3, 9),
  (4, 1), (4, 5), (4, 2),
  (5, 3), (5, 4), (5, 10),
  (6, 1), (6, 2), (6, 10),
  (7, 1), (7, 7), (7, 5),
  (8, 3), (8, 9), (8, 6)
ON CONFLICT DO NOTHING;


--  12. CLINIC ANIMAL TYPES

INSERT INTO clinic_animal_types (clinic_id, animal_type_id) VALUES
  (1, 1), (1, 2),
  (2, 1), (2, 2), (2, 3),
  (3, 1), (3, 2),
  (4, 1), (4, 2), (4, 4),
  (5, 1), (5, 2),
  (6, 1), (6, 2), (6, 3),
  (7, 1), (7, 2),
  (8, 1), (8, 2), (8, 5)
ON CONFLICT DO NOTHING;


--  13. VET SPECIALTIES 

INSERT INTO vet_specialties (vet_id, specialty_id) VALUES
  (1, 1), (1, 5), (1, 3)
ON CONFLICT DO NOTHING;


--  14. VET ANIMAL TYPES — vet_id 1

INSERT INTO vet_animal_types (vet_id, animal_type_id) VALUES
  (1, 1), (1, 2)
ON CONFLICT DO NOTHING;


--  15. SCHEDULES

INSERT INTO schedules (business_id, day_of_week, open_time, close_time, is_open) VALUES
  -- Clinica El Poblado (24h — is_open=true todos los días)
  (1, 'Monday',    '00:00', '23:59', TRUE),
  (1, 'Tuesday',   '00:00', '23:59', TRUE),
  (1, 'Wednesday', '00:00', '23:59', TRUE),
  (1, 'Thursday',  '00:00', '23:59', TRUE),
  (1, 'Friday',    '00:00', '23:59', TRUE),
  (1, 'Saturday',  '00:00', '23:59', TRUE),
  (1, 'Sunday',    '00:00', '23:59', TRUE),
  -- Clinica Laureles (lun-vie 8-18, sab 8-13, dom cerrado)
  (2, 'Monday',    '08:00', '18:00', TRUE),
  (2, 'Tuesday',   '08:00', '18:00', TRUE),
  (2, 'Wednesday', '08:00', '18:00', TRUE),
  (2, 'Thursday',  '08:00', '18:00', TRUE),
  (2, 'Friday',    '08:00', '18:00', TRUE),
  (2, 'Saturday',  '08:00', '13:00', TRUE),
  (2, 'Sunday',    NULL,    NULL,    FALSE),
  -- Guarderia Caniland (lun-sab 7-19)
  (11, 'Monday',    '07:00', '19:00', TRUE),
  (11, 'Tuesday',   '07:00', '19:00', TRUE),
  (11, 'Wednesday', '07:00', '19:00', TRUE),
  (11, 'Thursday',  '07:00', '19:00', TRUE),
  (11, 'Friday',    '07:00', '19:00', TRUE),
  (11, 'Saturday',  '07:00', '14:00', TRUE),
  (11, 'Sunday',    NULL,    NULL,    FALSE)
ON CONFLICT DO NOTHING;


--  16. PETS

INSERT INTO pets (user_id, name, animal_type_id, breed, birth_date, weight_kg) VALUES
  (2, 'Bruno', 1, 'Golden Retriever', '2023-03-15', 30.5),
  (2, 'Mochi', 2, 'Persian',          '2024-03-15',  4.2),
  (3, 'Coco',  1, 'French Bulldog',   '2022-03-15', 12.0),
  (4, 'Nina',  2, 'Siamese',          '2025-03-15',  3.8),
  (5, 'Dante', 1, 'Labrador',         '2020-03-15', 32.0)
ON CONFLICT DO NOTHING;


--  17. DAYCARE SLOTS — daycare_id 1 (Caniland)

INSERT INTO daycare_slots (daycare_id, day_of_week, start_time, end_time, capacity, is_active) VALUES
  (1, 'Monday',    '07:00', '13:00', 8, TRUE),
  (1, 'Monday',    '13:00', '19:00', 8, TRUE),
  (1, 'Tuesday',   '07:00', '13:00', 8, TRUE),
  (1, 'Tuesday',   '13:00', '19:00', 8, TRUE),
  (1, 'Wednesday', '07:00', '13:00', 8, TRUE),
  (1, 'Wednesday', '13:00', '19:00', 8, TRUE),
  (1, 'Thursday',  '07:00', '13:00', 8, TRUE),
  (1, 'Thursday',  '13:00', '19:00', 8, TRUE),
  (1, 'Friday',    '07:00', '13:00', 8, TRUE),
  (1, 'Friday',    '13:00', '19:00', 8, TRUE),
  (1, 'Saturday',  '07:00', '14:00', 5, TRUE)
ON CONFLICT DO NOTHING;


--  18. DAYCARE BOOKINGS

INSERT INTO daycare_bookings (slot_id, pet_id, user_id, booking_date, status, notes) VALUES
  (1, 1, 2, '2026-04-07', 'confirmed', 'Bruno — día completo mañana'),
  (2, 1, 2, '2026-04-07', 'confirmed', 'Bruno — día completo tarde'),
  (3, 3, 3, '2026-04-08', 'pending',   'Coco primera vez en guardería'),
  (5, 5, 5, '2026-04-09', 'confirmed', 'Dante — media jornada'),
  (1, 1, 2, '2026-03-24', 'completed', NULL),
  (3, 3, 3, '2026-03-25', 'cancelled', 'Camila canceló por lluvia')
ON CONFLICT DO NOTHING;


--  19. SHELTER PETS 

INSERT INTO shelter_pets (shelter_id, name, species, breed, birth_date, weight_kg, gender, description, status, intake_date, intake_reason) VALUES
  (1, 'Luna',   'Cat', 'Mestiza',          '2022-06-10', 3.2, 'female', 'Gata tranquila y cariñosa, buena con niños.',         'available', '2025-11-01', 'stray'),
  (1, 'Rocky',  'Dog', 'Mestizo',          '2021-03-20', 18.0,'male',   'Perro activo, necesita espacio. Esterilizado.',        'available', '2025-10-15', 'surrendered'),
  (1, 'Pelusa', 'Cat', 'Angora',           '2023-01-05', 2.8, 'female', 'Muy juguetona. Lleva vacunas al día.',                 'reserved',  '2026-01-10', 'rescued'),
  (1, 'Thor',   'Dog', 'Labrador Mestizo', '2020-08-12', 25.0,'male',   'Adulto tranquilo. Ideal para familia con experiencia.','available', '2025-09-30', 'transferred'),
  (1, 'Mia',    'Dog', 'Beagle Mestiza',   '2024-02-14', 8.5, 'female', 'Cachorra curiosa y enérgica.',                        'available', '2026-02-01', 'stray')
ON CONFLICT DO NOTHING;


--  20. ADOPTIONS

INSERT INTO pets (user_id, name, animal_type_id, breed, birth_date, weight_kg) VALUES
  (4, 'Pelusa', 2, 'Angora', '2023-01-05', 2.8)
ON CONFLICT DO NOTHING;
-- pet_id=6 para Pelusa adoptada

INSERT INTO adoptions (shelter_id, shelter_pet_id, user_id, pet_id, adoption_date, notes) VALUES
  (1, 3, 4, 6, '2026-03-01', 'Adopción completada. Juan firmó contrato de responsabilidad.')
ON CONFLICT DO NOTHING;

-- Actualizar status de Pelusa en shelter_pets
UPDATE shelter_pets SET status = 'adopted' WHERE shelter_pet_id = 3;


--  21. MEDICAL RECORDS

INSERT INTO medical_records (pet_id, clinic_id, user_id, veterinarian, visit_date, visit_type, reason, diagnosis, treatment, notes, next_visit_date) VALUES
  (1, 1, 2, 'Dr. García',   '2026-01-15 10:00', 'Checkup',     'Control anual',               'Saludable, peso ideal',             'Ninguno',                         'Excelente condición general',    '2027-01-15'),
  (1, 1, 2, 'Dr. García',   '2025-08-20 09:30', 'Vaccination', 'Vacunas anuales',             'Al día en vacunación',              'DHPP + Rabia',                    NULL,                             '2026-08-20'),
  (2, 2, 2, 'Dra. Muñoz',   '2026-02-10 11:00', 'Dental',      'Limpieza dental',             'Sarro leve',                        'Profilaxis dental',               'Control en 6 meses',             '2026-08-10'),
  (3, 3, 3, 'Dr. Pérez',    '2026-01-20 08:30', 'Vaccination', 'Vacuna polivalente',          'Sano',                              'Polivalente canina',              NULL,                             '2027-01-20'),
  (3, 4, 3, 'Dra. López',   '2025-12-05 16:00', 'Grooming',    'Baño y corte',                'Sin hallazgos',                     'Baño medicado + corte de uñas',   NULL,                             NULL),
  (5, 1, 5, 'Dr. García',   '2026-03-10 09:00', 'Vaccination', 'Rabia anual',                 'Sano',                              'Antirrábica',                     NULL,                             '2027-03-10'),
  (5, 5, 5, 'Dr. Ramírez',  '2026-02-05 10:30', 'Checkup',     'Control de peso',             'Sobrepeso leve — 34kg',             'Dieta hipocalórica 3 meses',      'Recomendado ejercicio diario',   '2026-05-05'),
  (4, NULL, 4, NULL,        '2026-01-10 00:00', 'Other',       'Registro subido por el dueño','Historial de clínica anterior',     NULL,                              'Archivo adjunto pendiente',      NULL)
ON CONFLICT DO NOTHING;


--  22. EMERGENCIES

INSERT INTO emergencies (pet_id, business_id, description, status, resolved_at) VALUES
  (1, 1, 'Bruno ingirió un juguete pequeño. Vómitos desde hace 2 horas.',      'resolved',    '2025-11-10 14:30'),
  (5, 3, 'Dante convulsionó por 3 minutos. Primera vez que ocurre.',            'resolved',    '2025-12-20 20:00'),
  (3, 1, 'Coco no puede apoyar pata trasera derecha tras caída.',               'in_progress', NULL),
  (2, 2, 'Mochi dejó de comer hace 48 horas y está muy decaída.',               'open',        NULL)
ON CONFLICT DO NOTHING;


--  23. EMERGENCY MESSAGES

INSERT INTO emergency_messages (business_id, emergency_id, message, contact_name, contact_phone, channel, status) VALUES
  (1, 1, 'Mi perro Bruno se comió un juguete, necesito atención urgente',      'Andres Restrepo', '3046712893', 'whatsapp', 'resolved'),
  (3, 2, 'Dante tuvo una convulsión, voy para allá ahora',                     'Natalia Herrera', '3157823046', 'call',     'resolved'),
  (1, 3, 'Coco se cayó y no puede caminar, estamos de camino',                 'Camila Montoya',  '3113489205', 'whatsapp', 'sent'),
  (2, 4, 'Mochi lleva 2 días sin comer, qué hago?',                            'Andres Restrepo', '3046712893', 'whatsapp', 'pending'),
  (1, NULL, 'Consulta: cuánto cuesta una radiografía de cadera?',              'Juan Gomez',      '3204561738', 'whatsapp', 'resolved')
ON CONFLICT DO NOTHING;


--  24. APPOINTMENTS

INSERT INTO appointments (user_id, business_id, pet_id, date, time, status, notes) VALUES
  -- Andres — futuras
  (2, 1, 1, '2026-04-05', '09:00', 'confirmed', 'Chequeo anual + vacuna antirrábica'),
  (2, 1, 2, '2026-04-07', '10:30', 'pending',   'Revisión dental'),
  (2, 2, 1, '2026-04-18', '11:00', 'pending',   'Control post-cirugía cadera'),
  -- Andres — historial
  (2, 1, 1, '2026-02-10', '11:00', 'completed', 'Alergia estacional — resuelto'),
  (2, 3, 2, '2026-01-20', '09:00', 'completed', 'Vacunación triple felina'),
  (2, 2, 1, '2026-03-01', '08:30', 'cancelled', 'Cliente canceló por viaje'),
  -- Camila
  (3, 2, 3, '2026-04-10', '14:00', 'confirmed', 'Desparasitación mensual'),
  (3, 3, 3, '2026-01-15', '09:30', 'completed', 'Vacuna polivalente'),
  (3, 4, 3, '2025-12-05', '16:00', 'completed', 'Limpieza dental'),
  -- Juan
  (4, 3, 4, '2026-04-12', '15:30', 'pending',   'Primera consulta general'),
  (4, 5, 4, '2026-02-28', '10:00', 'cancelled', 'No se presentó'),
  -- Natalia
  (5, 1, 5, '2026-04-20', '08:00', 'confirmed', 'Control de peso y dieta'),
  (5, 6, 5, '2026-03-10', '09:00', 'completed', 'Vacuna antirrábica anual'),
  (5, 5, 5, '2026-04-28', '11:30', 'pending',   NULL)
ON CONFLICT DO NOTHING;

COMMIT;