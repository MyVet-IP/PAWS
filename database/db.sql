CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(30),
  role VARCHAR(30) DEFAULT 'user' CHECK (role IN ('user', 'business', 'admin')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS specialties (
  specialty_id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS animal_types (
  animal_type_id SERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE
);


CREATE TABLE IF NOT EXISTS businesses (
  business_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  business_type VARCHAR(30) NOT NULL CHECK (business_type IN ('clinic', 'shelter', 'petshop', 'dog_walker', 'daycare')),
  name VARCHAR(140) NOT NULL,
  address VARCHAR(200) NOT NULL,
  phone VARCHAR(30),
  whatsapp VARCHAR(30),
  email VARCHAR(180),
  zone VARCHAR(100),
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  image_url VARCHAR(255),
  status VARCHAR(60) DEFAULT 'active',
  nit VARCHAR(50),
  nit_verified VARCHAR(30),
  nit_verified_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pets (
  pet_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name VARCHAR(120) NOT NULL,
  species VARCHAR(80) NOT NULL,
  breed VARCHAR(100),
  birth_date DATE,
  weight_kg DECIMAL(6,2),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS clinics (
  clinic_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL UNIQUE,
  service_type VARCHAR(20) DEFAULT 'public' CHECK (service_type IN ('public', 'private')),
  is_24h BOOLEAN DEFAULT FALSE,
  rating DECIMAL(2,1) DEFAULT 0,
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS shelters (
  shelter_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS petshops (
  petshop_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS dog_walkers (
  walker_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL UNIQUE,
  bio TEXT,
  service_area VARCHAR(200),
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS daycares (
  daycare_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vets (
  vet_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL,
  license_number VARCHAR(100),
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE CASCADE
);

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

CREATE TABLE IF NOT EXISTS emergencies (
  emergency_id SERIAL PRIMARY KEY,
  pet_id INTEGER NOT NULL,
  business_id INTEGER NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'cancelled')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(pet_id) ON DELETE CASCADE,
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE RESTRICT
);


CREATE TABLE IF NOT EXISTS medical_records (
  record_id SERIAL PRIMARY KEY,
  pet_id INTEGER NOT NULL,
  clinic_id INTEGER NOT NULL,
  user_id INTEGER,
  visit_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  visit_type VARCHAR(50) DEFAULT 'general',
  reason TEXT,
  diagnosis TEXT,
  treatment TEXT,
  notes TEXT,
  file_url VARCHAR(500),
  file_original_name VARCHAR(255),
  file_mime_type VARCHAR(100),
  file_size_bytes INTEGER,
  next_visit_date DATE,
  follow_up_notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(pet_id) ON DELETE CASCADE,
  FOREIGN KEY (clinic_id) REFERENCES clinics(clinic_id) ON DELETE RESTRICT,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
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

CREATE TABLE IF NOT EXISTS vet_specialties (
  vet_id INTEGER NOT NULL,
  specialty_id INTEGER NOT NULL,
  PRIMARY KEY (vet_id, specialty_id),
  FOREIGN KEY (vet_id) REFERENCES vets(vet_id) ON DELETE CASCADE,
  FOREIGN KEY (specialty_id) REFERENCES specialties(specialty_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vet_animal_types (
  vet_id INTEGER NOT NULL,
  animal_type_id INTEGER NOT NULL,
  PRIMARY KEY (vet_id, animal_type_id),
  FOREIGN KEY (vet_id) REFERENCES vets(vet_id) ON DELETE CASCADE,
  FOREIGN KEY (animal_type_id) REFERENCES animal_types(animal_type_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS shelter_pets (
  shelter_pet_id SERIAL PRIMARY KEY,
  shelter_id INTEGER NOT NULL,
  name VARCHAR(120) NOT NULL,
  species VARCHAR(80) NOT NULL,
  breed VARCHAR(100),
  birth_date DATE,
  weight_kg DECIMAL(6,2),
  gender VARCHAR(20),
  description TEXT,
  image_url VARCHAR(255),
  status VARCHAR(30) DEFAULT 'available' CHECK (status IN ('available', 'adopted', 'fostered', 'medical_hold')),
  intake_date DATE,
  intake_reason VARCHAR(200),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (shelter_id) REFERENCES shelters(shelter_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS daycare_slots (
  slot_id SERIAL PRIMARY KEY,
  daycare_id INTEGER NOT NULL,
  day_of_week VARCHAR(10) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (daycare_id) REFERENCES daycares(daycare_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS emergency_messages (
  message_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL,
  emergency_id INTEGER,
  message TEXT NOT NULL,
  contact_name VARCHAR(120) NOT NULL,
  contact_phone VARCHAR(30),
  channel VARCHAR(30) DEFAULT 'whatsapp',
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'resolved')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE RESTRICT,
  FOREIGN KEY (emergency_id) REFERENCES emergencies(emergency_id) ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS adoptions (
  adoption_id SERIAL PRIMARY KEY,
  shelter_id INTEGER NOT NULL,
  shelter_pet_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  pet_id INTEGER,
  adoption_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (shelter_id) REFERENCES shelters(shelter_id) ON DELETE RESTRICT,
  FOREIGN KEY (shelter_pet_id) REFERENCES shelter_pets(shelter_pet_id) ON DELETE RESTRICT,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE RESTRICT,
  FOREIGN KEY (pet_id) REFERENCES pets(pet_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS daycare_bookings (
  booking_id SERIAL PRIMARY KEY,
  slot_id INTEGER NOT NULL,
  pet_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  booking_date DATE NOT NULL,
  status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (slot_id) REFERENCES daycare_slots(slot_id) ON DELETE RESTRICT,
  FOREIGN KEY (pet_id) REFERENCES pets(pet_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE INDEX IF NOT EXISTS idx_businesses_user ON businesses(user_id);
CREATE INDEX IF NOT EXISTS idx_businesses_type ON businesses(business_type);
CREATE INDEX IF NOT EXISTS idx_pets_user ON pets(user_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_pet ON medical_records(pet_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_clinic ON medical_records(clinic_id);
CREATE INDEX IF NOT EXISTS idx_emergencies_pet ON emergencies(pet_id);
CREATE INDEX IF NOT EXISTS idx_emergencies_business ON emergencies(business_id);
CREATE INDEX IF NOT EXISTS idx_emergency_messages_business ON emergency_messages(business_id);
CREATE INDEX IF NOT EXISTS idx_emergency_messages_emergency ON emergency_messages(emergency_id);
CREATE INDEX IF NOT EXISTS idx_schedules_business ON schedules(business_id);
CREATE INDEX IF NOT EXISTS idx_shelter_pets_shelter ON shelter_pets(shelter_id);
CREATE INDEX IF NOT EXISTS idx_adoptions_shelter ON adoptions(shelter_id);
CREATE INDEX IF NOT EXISTS idx_adoptions_user ON adoptions(user_id);
CREATE INDEX IF NOT EXISTS idx_daycare_slots_daycare ON daycare_slots(daycare_id);
CREATE INDEX IF NOT EXISTS idx_daycare_bookings_slot ON daycare_bookings(slot_id);
CREATE INDEX IF NOT EXISTS idx_daycare_bookings_user ON daycare_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_vets_business ON vets(business_id);


INSERT INTO users (name, email, password, phone, role) VALUES
  ('Admin PAWS',       'admin@paws.local',            '123456', NULL,          'admin'),
  ('Andres Restrepo',  'andres.restrepo@gmail.com',   '123456', '3046712893',  'user'),
  ('Camila Montoya',   'camila.montoya@hotmail.com',  '123456', '3113489205',  'user'),
  ('Juan Gomez',       'juangomez94@gmail.com',       '123456', '3204561738',  'user'),
  ('Natalia Herrera',  'nherrera.med@outlook.com',    '123456', '3157823046',  'user')
ON CONFLICT (email) DO NOTHING;

INSERT INTO businesses (user_id, business_type, name, address, phone, whatsapp, zone, latitude, longitude, image_url, status) VALUES
  (1, 'clinic', 'Clinica Veterinaria El Poblado',     'Cra. 43A #16-22, El Poblado, Medellin',   '6042567890', '573193052287', 'El Poblado',    6.2086,  -75.5659, './frontend/assets/images/lllll.jpg', 'active'),
  (1, 'clinic', 'Centro Medico Veterinario Laureles', 'Cra. 76 #33-45, Laureles, Medellin',      '6043234567', '573193052287', 'Laureles',      6.2442,  -75.5906, './frontend/assets/images/lllll.jpg', 'active'),
  (1, 'clinic', 'Veterinaria Envigado',               'Cll. 38 Sur #43-12, Envigado, Antioquia', '6044512380', '573193052287', 'Envigado',      6.1700,  -75.5920, './frontend/assets/images/lllll.jpg', 'active'),
  (1, 'clinic', 'Clinica Animal Belen',               'Cra. 76 #50-23, Belen, Medellin',         '6043987654', '573193052287', 'Belen',         6.2364,  -75.6108, './frontend/assets/images/lllll.jpg', 'active'),
  (1, 'clinic', 'VetSalud Sabaneta',                  'Cll. 77 Sur #43-10, Sabaneta, Antioquia', '6044678901', '573193052287', 'Sabaneta',      6.1516,  -75.6149, './frontend/assets/images/lllll.jpg', 'active'),
  (1, 'clinic', 'Veterinaria Bello Norte',            'Cra. 50 #45-67, Bello, Antioquia',        '6044234567', '573193052287', 'Bello',         6.3295,  -75.5593, './frontend/assets/images/lllll.jpg', 'active'),
  (1, 'clinic', 'Clinica Veterinaria Robledo',        'Cra. 80 #65-12, Robledo, Medellin',       '6042901234', '573193052287', 'Robledo',       6.2722,  -75.6100, './frontend/assets/images/lllll.jpg', 'active'),
  (1, 'clinic', 'Veterinaria La Candelaria',          'Cll. 44 #52-25, La Candelaria, Medellin', '6042512345', '573193052287', 'La Candelaria', 6.2518,  -75.5636, './frontend/assets/images/lllll.jpg', 'active')
ON CONFLICT DO NOTHING;

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

INSERT INTO specialties (name) VALUES
  ('Vaccination'),
  ('Grooming'),
  ('Surgery'),
  ('X-Ray'),
  ('Dental'),
  ('Cardiology'),
  ('Laboratory'),
  ('Physiotherapy'),
  ('Emergency'),
  ('Boarding')
ON CONFLICT (name) DO NOTHING;

INSERT INTO animal_types (name) VALUES
  ('Dog'),
  ('Cat'),
  ('Bird'),
  ('Rabbit'),
  ('Exotic'),
  ('Reptile'),
  ('Fish')
ON CONFLICT (name) DO NOTHING;

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

INSERT INTO pets (user_id, name, species, breed, birth_date, weight_kg) VALUES
  (2, 'Bruno', 'Dog', 'Golden Retriever', '2023-03-15', 30.5),
  (2, 'Mochi', 'Cat', 'Persian',          '2024-03-15', 4.2),
  (3, 'Coco',  'Dog', 'French Bulldog',   '2022-03-15', 12.0),
  (4, 'Nina',  'Cat', 'Siamese',          '2025-03-15', 3.8),
  (5, 'Dante', 'Dog', 'Labrador',         '2020-03-15', 32.0)
ON CONFLICT DO NOTHING;
