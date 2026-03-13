BEGIN;

CREATE SCHEMA IF NOT EXISTS paws_v2;

CREATE TABLE IF NOT EXISTS paws_v2.users (
  user_id SERIAL PRIMARY KEY,
  legacy_cliente_id INTEGER UNIQUE,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(180) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(30),
  role VARCHAR(20) NOT NULL DEFAULT 'owner' CHECK (role IN ('owner', 'admin', 'vet', 'staff', 'shelter_staff')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS paws_v2.businesses (
  business_id SERIAL PRIMARY KEY,
  legacy_veterinaria_id INTEGER UNIQUE,
  legacy_guarderia_id INTEGER UNIQUE,
  legacy_refugio_id INTEGER UNIQUE,
  owner_id INTEGER,
  business_name VARCHAR(160) NOT NULL,
  nit VARCHAR(40),
  sector VARCHAR(120),
  phone VARCHAR(30),
  whatsapp VARCHAR(30),
  email VARCHAR(180),
  long_desc TEXT,
  image_url VARCHAR(255),
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft')),
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  is_certified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES paws_v2.users(user_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS paws_v2.clinics (
  clinic_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL UNIQUE,
  service_type VARCHAR(20) NOT NULL DEFAULT 'public' CHECK (service_type IN ('public', 'private')),
  is_24h BOOLEAN NOT NULL DEFAULT FALSE,
  rating DECIMAL(2,1) DEFAULT 0,
  FOREIGN KEY (business_id) REFERENCES paws_v2.businesses(business_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS paws_v2.vets (
  vet_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL,
  license_no VARCHAR(100),
  phone_number VARCHAR(30),
  FOREIGN KEY (business_id) REFERENCES paws_v2.businesses(business_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS paws_v2.petshops (
  petshop_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (business_id) REFERENCES paws_v2.businesses(business_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS paws_v2.daycares (
  daycare_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (business_id) REFERENCES paws_v2.businesses(business_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS paws_v2.daycare_slots (
  slot_id SERIAL PRIMARY KEY,
  daycare_id INTEGER NOT NULL,
  day_of_week VARCHAR(10) NOT NULL CHECK (day_of_week IN ('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday')),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 1 CHECK (capacity > 0),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  FOREIGN KEY (daycare_id) REFERENCES paws_v2.daycares(daycare_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS paws_v2.daycare_bookings (
  booking_id SERIAL PRIMARY KEY,
  slot_id INTEGER NOT NULL,
  pet_id INTEGER,
  user_id INTEGER,
  booking_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'done')),
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (slot_id) REFERENCES paws_v2.daycare_slots(slot_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES paws_v2.users(user_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS paws_v2.shelters (
  shelter_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (business_id) REFERENCES paws_v2.businesses(business_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS paws_v2.shelter_pets (
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
  status VARCHAR(20) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'adopted', 'hold', 'medical_care')),
  intake_date DATE,
  rescue_reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (shelter_id) REFERENCES paws_v2.shelters(shelter_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS paws_v2.adoptions (
  adoption_id SERIAL PRIMARY KEY,
  shelter_pet_id INTEGER NOT NULL,
  user_id INTEGER,
  pet_id INTEGER,
  adoption_date DATE,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (shelter_pet_id) REFERENCES paws_v2.shelter_pets(shelter_pet_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES paws_v2.users(user_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS paws_v2.specialties (
  specialty_id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS paws_v2.animal_types (
  animal_type_id SERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS paws_v2.clinic_specialties (
  clinic_id INTEGER NOT NULL,
  specialty_id INTEGER NOT NULL,
  PRIMARY KEY (clinic_id, specialty_id),
  FOREIGN KEY (clinic_id) REFERENCES paws_v2.clinics(clinic_id) ON DELETE CASCADE,
  FOREIGN KEY (specialty_id) REFERENCES paws_v2.specialties(specialty_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS paws_v2.clinic_animal_types (
  clinic_id INTEGER NOT NULL,
  animal_type_id INTEGER NOT NULL,
  PRIMARY KEY (clinic_id, animal_type_id),
  FOREIGN KEY (clinic_id) REFERENCES paws_v2.clinics(clinic_id) ON DELETE CASCADE,
  FOREIGN KEY (animal_type_id) REFERENCES paws_v2.animal_types(animal_type_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS paws_v2.vet_specialties (
  vet_id INTEGER NOT NULL,
  specialty_id INTEGER NOT NULL,
  PRIMARY KEY (vet_id, specialty_id),
  FOREIGN KEY (vet_id) REFERENCES paws_v2.vets(vet_id) ON DELETE CASCADE,
  FOREIGN KEY (specialty_id) REFERENCES paws_v2.specialties(specialty_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS paws_v2.vet_animal_types (
  vet_id INTEGER NOT NULL,
  animal_type_id INTEGER NOT NULL,
  PRIMARY KEY (vet_id, animal_type_id),
  FOREIGN KEY (vet_id) REFERENCES paws_v2.vets(vet_id) ON DELETE CASCADE,
  FOREIGN KEY (animal_type_id) REFERENCES paws_v2.animal_types(animal_type_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS paws_v2.schedules (
  schedule_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL,
  day_of_week VARCHAR(10) NOT NULL CHECK (day_of_week IN ('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday')),
  open_time TIME,
  close_time TIME,
  is_open BOOLEAN NOT NULL DEFAULT TRUE,
  FOREIGN KEY (business_id) REFERENCES paws_v2.businesses(business_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS paws_v2.pets (
  pet_id SERIAL PRIMARY KEY,
  legacy_mascota_id INTEGER UNIQUE,
  user_id INTEGER NOT NULL,
  name VARCHAR(120) NOT NULL,
  species VARCHAR(80) NOT NULL,
  breed VARCHAR(100),
  birth_date DATE,
  weight_kg DECIMAL(6,2),
  gender VARCHAR(20),
  description TEXT,
  image_url VARCHAR(255),
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'deceased')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES paws_v2.users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS paws_v2.medical_records (
  record_id SERIAL PRIMARY KEY,
  legacy_visita_id INTEGER UNIQUE,
  pet_id INTEGER NOT NULL,
  clinic_id INTEGER,
  user_id INTEGER,
  visit_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  visit_type VARCHAR(80),
  reason TEXT,
  diagnosis TEXT,
  treatment TEXT,
  notes TEXT,
  veterinarian VARCHAR(120),
  next_visit_date DATE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES paws_v2.pets(pet_id) ON DELETE CASCADE,
  FOREIGN KEY (clinic_id) REFERENCES paws_v2.clinics(clinic_id) ON DELETE SET NULL,
  FOREIGN KEY (user_id) REFERENCES paws_v2.users(user_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS paws_v2.emergencies (
  emergency_id SERIAL PRIMARY KEY,
  legacy_emergencia_id INTEGER UNIQUE,
  pet_id INTEGER,
  business_id INTEGER,
  description TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'attending', 'resolved', 'cancelled')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES paws_v2.pets(pet_id) ON DELETE SET NULL,
  FOREIGN KEY (business_id) REFERENCES paws_v2.businesses(business_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS paws_v2.emergency_messages (
  message_id SERIAL PRIMARY KEY,
  legacy_mensaje_id INTEGER UNIQUE,
  business_id INTEGER,
  emergency_id INTEGER,
  message TEXT NOT NULL,
  contact_name VARCHAR(120),
  contact_phone VARCHAR(30),
  channel VARCHAR(30) NOT NULL DEFAULT 'whatsapp',
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'resolved')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (business_id) REFERENCES paws_v2.businesses(business_id) ON DELETE SET NULL,
  FOREIGN KEY (emergency_id) REFERENCES paws_v2.emergencies(emergency_id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_v2_users_email ON paws_v2.users(email);
CREATE INDEX IF NOT EXISTS idx_v2_businesses_owner ON paws_v2.businesses(owner_id);
CREATE INDEX IF NOT EXISTS idx_v2_clinics_business ON paws_v2.clinics(business_id);
CREATE INDEX IF NOT EXISTS idx_v2_pets_user ON paws_v2.pets(user_id);
CREATE INDEX IF NOT EXISTS idx_v2_medical_records_pet ON paws_v2.medical_records(pet_id);
CREATE INDEX IF NOT EXISTS idx_v2_medical_records_clinic ON paws_v2.medical_records(clinic_id);
CREATE INDEX IF NOT EXISTS idx_v2_emergencies_pet ON paws_v2.emergencies(pet_id);
CREATE INDEX IF NOT EXISTS idx_v2_emergencies_business ON paws_v2.emergencies(business_id);
CREATE INDEX IF NOT EXISTS idx_v2_emergency_messages_business ON paws_v2.emergency_messages(business_id);
CREATE INDEX IF NOT EXISTS idx_v2_daycare_slots_daycare ON paws_v2.daycare_slots(daycare_id);
CREATE INDEX IF NOT EXISTS idx_v2_daycare_bookings_slot ON paws_v2.daycare_bookings(slot_id);
CREATE INDEX IF NOT EXISTS idx_v2_shelter_pets_shelter ON paws_v2.shelter_pets(shelter_id);

COMMIT;
