
--  PAWS Database Schema - PostgreSQL


--  USERS
--  Roles:
--    user     : pet owners, use the app to find services
--    business : owns a business profile (clinics, daycares, etc.)
--    admin    : platform management
BEGIN;



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
--  One row per registered business. Linked to the owner user.
--  Each business_type has its own detail table below.
--
--  NIT / legal registration (Colombia):
--    - Required for all business types except 'dog_walker'
--      (dog walkers are natural persons, not legal entities)
--    - Enforced via CHECK constraint at DB level
--    - nit_verified tracks the verification workflow:
--        pending  → submitted, awaiting review
--        verified → confirmed legitimate
--        rejected → invalid or fraudulent
--    - nit_verified is NULL for dog_walkers (not applicable)

CREATE TABLE IF NOT EXISTS businesses (
  business_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE,
  business_type VARCHAR(20) NOT NULL CHECK (business_type IN ('clinic','daycare','shelter','petshop','vet','dog_walker')),
  name VARCHAR(140) NOT NULL,
  address VARCHAR(200),
  phone VARCHAR(30),
  whatsapp VARCHAR(30),
  email VARCHAR(180),
  zone VARCHAR(100),
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  image_url VARCHAR(500),
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','draft')),
  nit VARCHAR(20),
  nit_verified VARCHAR(20) CHECK (nit_verified IN ('pending','verified','rejected')),
  nit_verified_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  -- NIT constraint enforced
  CONSTRAINT chk_nit_required CHECK (
    (business_type = 'dog_walker' AND nit IS NULL AND nit_verified IS NULL)
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
--  Shared by all business types.
--  UNIQUE (business_id, day_of_week) prevents duplicate days.

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


--  CLINICS  (detail table for business_type = 'clinic')

CREATE TABLE IF NOT EXISTS clinics (
  clinic_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL UNIQUE,
  service_type VARCHAR(20) DEFAULT 'private' CHECK (service_type IN ('public','private')),
  is_24h BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT 0.00,
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


--  VETS  (detail table for business_type = 'vet')

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


--  PETSHOPS  (detail table for business_type = 'petshop')
CREATE TABLE IF NOT EXISTS petshops (
  petshop_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE CASCADE
);


--  DOG WALKERS  (detail table for business_type = 'dog_walker')
--  Natural persons — no NIT required.
CREATE TABLE IF NOT EXISTS dog_walkers (
  walker_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL UNIQUE,
  bio TEXT,
  service_area VARCHAR(200),  -- Neighborhoods / zones they cover
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE CASCADE
);


--  DAYCARES  (detail table for business_type = 'daycare')
CREATE TABLE IF NOT EXISTS daycares (
  daycare_id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE CASCADE
);


--  DAYCARE SLOTS
--  Defines the weekly time slots a daycare offers.
--  capacity = max pets that can be booked per slot instance.
--
--  Example:
--    Monday  | 08:00 - 13:00 | capacity 10
--    Monday  | 13:00 - 18:00 | capacity 8

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



--  PETS  (owned animals) — defined here so daycare_bookings
--  and medical_records can reference it below

CREATE TABLE IF NOT EXISTS pets (
  pet_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name VARCHAR(120) NOT NULL,
  species VARCHAR(80) NOT NULL,
  breed VARCHAR(100),
  birth_date DATE,
  weight_kg DECIMAL(5,2),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);



--  DAYCARE BOOKINGS
--  A user books a specific slot on a specific calendar date.
--
--  daycare_id removed — slot already belongs to a daycare,
--  join via daycare_slots to get it if needed.
--
--  Availability check (enforced in application layer):
--    SELECT COUNT(*) FROM daycare_bookings
--    WHERE slot_id = $1
--      AND booking_date = $2
--      AND status NOT IN ('cancelled','no_show')
--    → must be < daycare_slots.capacity

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


--  SHELTERS  (detail table for business_type = 'shelter')

CREATE TABLE IF NOT EXISTS shelters (
  shelter_id SERIAL PRIMARY KEY,
  business_id INTEGER  NOT NULL UNIQUE,
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE CASCADE
);


--  SHELTER PETS  (animals without an owner, up for adoption)
--  Separate from `pets` — they have no owner yet.
--  On adoption: a row is created in `pets` and `adoptions`,
--  and this record's status is updated to 'adopted'.

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
--  Flow:
--    1. User picks an available shelter_pet
--    2. A new row is inserted into `pets` (now owned)
--    3. Adoption row is created linking everything
--    4. shelter_pets.status → 'adopted'

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
--  One record per clinical event.
--  The uploaded file (PDF/image) is the source of truth.
--  clinic_id nullable — owner can upload records manually.

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
--  Only clinics and vets should receive emergencies.
--  Validated at application layer via business_type check.

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


-- Table to store refresh tokens (one per issued refresh token). Storing tokens
-- allows revocation (logout) and rotation if needed.
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  token VARCHAR(512) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
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



COMMIT;

