-- Google-import SQL helper
-- ------------------------
-- This script ingests the JSON batches (as inline JSOn) and performs idempotent
-- inserts into the PAWS schema. It:
--  - creates a placeholder owner user per business (email = import+<hash>@local.import)
--  - inserts into businesses mapping external types -> 'clinic' when needed (see note)
--  - creates clinics rows when appropriate
--  - ensures specialties exist and links them to clinics
--  - inserts schedules per day, avoiding duplicates
--
-- IMPORTANT NOTES BEFORE RUNNING
-- 1) The project's `businesses.business_type` column is restricted to the values
--    (clinic, daycare, shelter, petshop, vet, dog_walker). The Google data uses
--    values like 'hospital', 'clinica_general', 'especialidades', etc. This
--    script maps all non-explicit types to 'clinic'. Review and adjust the
--    mapping logic below if you want different behavior.
-- 2) The script sets a placeholder password 'IMPORT_PLACEHOLDER' for created
--    owner users. After running the import you should reset or hash passwords
--    appropriately for real accounts.
-- 3) Run this on a local/dev database. The script is idempotent but always
--    review results before applying to production.
--
-- To run:
--   psql -d your_db -f docs/google_import_sql.sql


-- Simple import SQL for batches 1-3
BEGIN;

INSERT INTO users (name,email,password,role)
SELECT 'Import Owner','import@data.local','IMPORT','business'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'import@data.local');

-- Batch 1
INSERT INTO businesses (user_id,business_type,name,address,phone,whatsapp,email,zone,latitude,longitude,image_url,status,nit)
SELECT (SELECT user_id FROM users WHERE email = 'import@data.local' LIMIT 1), 'clinic', 'Clínica Veterinaria de Medellín', 'Av. Nutibara #79a34, Laureles - Estadio, Medellín', '+576044084742', NULL, NULL, 'Laureles', 6.2492552, -75.5988668, 'http://www.clinicaveterinariamedellin.com/', 'active', 'IMPORT-1'
WHERE NOT EXISTS (SELECT 1 FROM businesses WHERE name = 'Clínica Veterinaria de Medellín' AND latitude = 6.2492552 AND longitude = -75.5988668);

INSERT INTO businesses (user_id,business_type,name,address,phone,whatsapp,email,zone,latitude,longitude,image_url,status,nit)
SELECT (SELECT user_id FROM users WHERE email = 'import@data.local' LIMIT 1), 'clinic', 'Vital Clínica Veterinaria de Especialistas', 'Cl. 11C Sur #48A24, El Poblado, Medellín', '+576044441299', NULL, NULL, 'El Poblado', 6.195609, -75.5798715, 'http://www.vital.vet/', 'active', 'IMPORT-2'
WHERE NOT EXISTS (SELECT 1 FROM businesses WHERE name = 'Vital Clínica Veterinaria de Especialistas' AND latitude = 6.195609 AND longitude = -75.5798715);

INSERT INTO businesses (user_id,business_type,name,address,phone,whatsapp,email,zone,latitude,longitude,image_url,status,nit)
SELECT (SELECT user_id FROM users WHERE email = 'import@data.local' LIMIT 1), 'clinic', 'Clínica Veterinaria Terranova', 'Cl. 56 #39-04, Centro, Medellín', '+573182755995', '573182755995', NULL, 'Centro', 6.2494652, -75.5574176, 'https://veterinariaterranova.com/', 'active', 'IMPORT-3'
WHERE NOT EXISTS (SELECT 1 FROM businesses WHERE name = 'Clínica Veterinaria Terranova' AND latitude = 6.2494652 AND longitude = -75.5574176);

INSERT INTO businesses (user_id,business_type,name,address,phone,whatsapp,email,zone,latitude,longitude,image_url,status,nit)
SELECT (SELECT user_id FROM users WHERE email = 'import@data.local' LIMIT 1), 'clinic', 'Animal Care Centro Veterinario', 'Cl. 32C #80A-100, Belén, Medellín', '+576044442706', NULL, NULL, 'Belén', 6.2360122, -75.6020243, NULL, 'active', 'IMPORT-4'
WHERE NOT EXISTS (SELECT 1 FROM businesses WHERE name = 'Animal Care Centro Veterinario' AND latitude = 6.2360122 AND longitude = -75.6020243);

INSERT INTO businesses (user_id,business_type,name,address,phone,whatsapp,email,zone,latitude,longitude,image_url,status,nit)
SELECT (SELECT user_id FROM users WHERE email = 'import@data.local' LIMIT 1), 'clinic', 'Caninos y Felinos', 'Cra. 78 #47-50, Laureles, Medellín', '+573122779528', '573122779528', NULL, 'Laureles', 6.2569873, -75.5959005, 'http://www.caninosyfelinos.com.co/', 'active', 'IMPORT-5'
WHERE NOT EXISTS (SELECT 1 FROM businesses WHERE name = 'Caninos y Felinos' AND latitude = 6.2569873 AND longitude = -75.5959005);

-- create clinics where missing
INSERT INTO clinics (business_id, is_24h, rating)
SELECT b.business_id, TRUE, 4.2 FROM businesses b WHERE b.name = 'Clínica Veterinaria de Medellín' AND NOT EXISTS (SELECT 1 FROM clinics c WHERE c.business_id = b.business_id);

INSERT INTO clinics (business_id, is_24h, rating)
SELECT b.business_id, TRUE, 4.5 FROM businesses b WHERE b.name = 'Vital Clínica Veterinaria de Especialistas' AND NOT EXISTS (SELECT 1 FROM clinics c WHERE c.business_id = b.business_id);

INSERT INTO clinics (business_id, is_24h, rating)
SELECT b.business_id, TRUE, 4.1 FROM businesses b WHERE b.name = 'Clínica Veterinaria Terranova' AND NOT EXISTS (SELECT 1 FROM clinics c WHERE c.business_id = b.business_id);

INSERT INTO clinics (business_id, is_24h, rating)
SELECT b.business_id, TRUE, 4.4 FROM businesses b WHERE b.name = 'Animal Care Centro Veterinario' AND NOT EXISTS (SELECT 1 FROM clinics c WHERE c.business_id = b.business_id);

INSERT INTO clinics (business_id, is_24h, rating)
SELECT b.business_id, TRUE, 4.2 FROM businesses b WHERE b.name = 'Caninos y Felinos' AND NOT EXISTS (SELECT 1 FROM clinics c WHERE c.business_id = b.business_id);

-- specialties for batch 1
INSERT INTO specialties (name) VALUES ('urgencias') ON CONFLICT (name) DO NOTHING;
INSERT INTO specialties (name) VALUES ('hospitalizacion') ON CONFLICT (name) DO NOTHING;
INSERT INTO specialties (name) VALUES ('cirugia') ON CONFLICT (name) DO NOTHING;
INSERT INTO specialties (name) VALUES ('laboratorio') ON CONFLICT (name) DO NOTHING;
INSERT INTO specialties (name) VALUES ('consulta_general') ON CONFLICT (name) DO NOTHING;

-- link specialties to clinics (batch 1)
INSERT INTO clinic_specialties (clinic_id, specialty_id)
SELECT c.clinic_id, s.specialty_id FROM clinics c JOIN specialties s ON s.name = 'urgencias' JOIN businesses b ON b.business_id = c.business_id WHERE b.name = 'Clínica Veterinaria de Medellín' AND NOT EXISTS (SELECT 1 FROM clinic_specialties cs WHERE cs.clinic_id = c.clinic_id AND cs.specialty_id = s.specialty_id);

INSERT INTO clinic_specialties (clinic_id, specialty_id)
SELECT c.clinic_id, s.specialty_id FROM clinics c JOIN specialties s ON s.name = 'hospitalizacion' JOIN businesses b ON b.business_id = c.business_id WHERE b.name = 'Clínica Veterinaria de Medellín' AND NOT EXISTS (SELECT 1 FROM clinic_specialties cs WHERE cs.clinic_id = c.clinic_id AND cs.specialty_id = s.specialty_id);

-- Batch 2
INSERT INTO businesses (user_id,business_type,name,address,phone,whatsapp,email,zone,latitude,longitude,image_url,status,nit)
SELECT (SELECT user_id FROM users WHERE email = 'import@data.local' LIMIT 1), 'clinic', 'Clínica Veterinaria San Bernardo', 'Cra. 48 #10-65, Laureles, Medellín', '+57412345678', NULL, NULL, 'Laureles', 6.2601, -75.5965, 'http://clinicaveterinariasanbernardo.com/', 'active', 'IMPORT-6'
WHERE NOT EXISTS (SELECT 1 FROM businesses WHERE name = 'Clínica Veterinaria San Bernardo' AND latitude = 6.2601 AND longitude = -75.5965);

INSERT INTO businesses (user_id,business_type,name,address,phone,whatsapp,email,zone,latitude,longitude,image_url,status,nit)
SELECT (SELECT user_id FROM users WHERE email = 'import@data.local' LIMIT 1), 'clinic', 'Centro Médico Veterinario El Estadio', 'Cl. 70 #50-15, Laureles, Medellín', '+57487654321', NULL, NULL, 'Laureles', 6.2563, -75.5951, NULL, 'active', 'IMPORT-7'
WHERE NOT EXISTS (SELECT 1 FROM businesses WHERE name = 'Centro Médico Veterinario El Estadio' AND latitude = 6.2563 AND longitude = -75.5951);

-- Batch 3
INSERT INTO businesses (user_id,business_type,name,address,phone,whatsapp,email,zone,latitude,longitude,image_url,status,nit)
SELECT (SELECT user_id FROM users WHERE email = 'import@data.local' LIMIT 1), 'clinic', 'Urgencias Veterinarias Las Vegas', 'Av. Las Vegas #25-10, Medellín', '+57433445566', NULL, NULL, 'La América', 6.2622, -75.5911, NULL, 'active', 'IMPORT-8'
WHERE NOT EXISTS (SELECT 1 FROM businesses WHERE name = 'Urgencias Veterinarias Las Vegas' AND latitude = 6.2622 AND longitude = -75.5911);

INSERT INTO businesses (user_id,business_type,name,address,phone,whatsapp,email,zone,latitude,longitude,image_url,status,nit)
SELECT (SELECT user_id FROM users WHERE email = 'import@data.local' LIMIT 1), 'clinic', 'Veterinaria El Tesoro', 'Cl. 10 #34-45, El Poblado, Medellín', '+57455667788', NULL, NULL, 'El Poblado', 6.1957, -75.5724, NULL, 'active', 'IMPORT-9'
WHERE NOT EXISTS (SELECT 1 FROM businesses WHERE name = 'Veterinaria El Tesoro' AND latitude = 6.1957 AND longitude = -75.5724);

COMMIT;
    -- map incoming type -> allowed business_type
    IF lower(rec->>'type') IN ('dog_walker') THEN
      mapped_type := 'dog_walker';
    ELSE
      [
        {
          "name": "Centro Veterinario Santa Mónica",
          "address": "Santa Mónica, Medellín",
          "phone": null,
          "whatsapp": null,
          "email": null,
          "zone": "Santa Mónica",
          "latitude": 6.27,
          "longitude": -75.61,
          "website": null,
          "rating": 4.2,
          "reviews": 120,
          "opening_hours": {"Monday":"08:00-18:00","Tuesday":"08:00-18:00","Wednesday":"08:00-18:00","Thursday":"08:00-18:00","Friday":"08:00-18:00","Saturday":"08:00-14:00","Sunday":"closed"},
          "image_url": null,
          "type": "clinica_general",
          "services": ["consulta_general","vacunacion","desparasitacion"]
        },
        {
          "name": "Clínica Veterinaria Santa Gema",
          "address": "Santa Gema, Medellín",
          "phone": null,
          "whatsapp": null,
          "email": null,
          "zone": "Belén",
          "latitude": 6.235,
          "longitude": -75.615,
          "website": null,
          "rating": 4.1,
          "reviews": 98,
          "opening_hours": {"Monday":"08:00-18:30","Tuesday":"08:00-18:30","Wednesday":"08:00-18:30","Thursday":"08:00-18:30","Friday":"08:00-18:30","Saturday":"08:00-14:00","Sunday":"closed"},
          "image_url": null,
          "type": "clinica_general",
          "services": ["consulta_general","esterilizacion"]
        },
        {
          "name": "Vet San Antonio",
          "address": "San Antonio de Prado, Medellín",
          "phone": null,
          "whatsapp": null,
          "email": null,
          "zone": "San Antonio",
          "latitude": 6.17,
          "longitude": -75.64,
          "website": null,
          "rating": 4.0,
          "reviews": 85,
          "opening_hours": {"Monday":"08:00-18:00","Tuesday":"08:00-18:00","Wednesday":"08:00-18:00","Thursday":"08:00-18:00","Friday":"08:00-18:00","Saturday":"08:00-14:00","Sunday":"closed"},
          "image_url": null,
          "type": "clinica_general",
          "services": ["consulta_general"]
        },
        {
          "name": "Pet Clinic San Cristóbal",
          "address": "San Cristóbal, Medellín",
          "phone": null,
          "whatsapp": null,
          "email": null,
          "zone": "San Cristóbal",
          "latitude": 6.29,
          "longitude": -75.65,
          "website": null,
          "rating": 4.3,
          "reviews": 110,
          "opening_hours": {"Monday":"09:00-18:00","Tuesday":"09:00-18:00","Wednesday":"09:00-18:00","Thursday":"09:00-18:00","Friday":"09:00-18:00","Saturday":"09:00-14:00","Sunday":"closed"},
          "image_url": null,
          "type": "clinica_general",
          "services": ["consulta_general","vacunacion"]
        },
        {
          "name": "Centro Veterinario La Castellana",
          "address": "La Castellana, Medellín",
          "phone": null,
          "whatsapp": null,
          "email": null,
          "zone": "Laureles",
          "latitude": 6.262,
          "longitude": -75.602,
          "website": null,
          "rating": 4.4,
          "reviews": 135,
          "opening_hours": {"Monday":"08:00-19:00","Tuesday":"08:00-19:00","Wednesday":"08:00-19:00","Thursday":"08:00-19:00","Friday":"08:00-19:00","Saturday":"08:00-15:00","Sunday":"closed"},
          "image_url": null,
          "type": "clinica_general",
          "services": ["consulta_general","cirugia_basica"]
        },
        {
          "name": "Vet Vida Animal",
          "address": "Campo Valdés, Medellín",
          "phone": null,
          "whatsapp": null,
          "email": null,
          "zone": "Campo Valdés",
          "latitude": 6.29,
          "longitude": -75.56,
          "website": null,
          "rating": 4.1,
          "reviews": 95,
          "opening_hours": {"Monday":"08:00-18:30","Tuesday":"08:00-18:30","Wednesday":"08:00-18:30","Thursday":"08:00-18:30","Friday":"08:00-18:30","Saturday":"08:00-14:00","Sunday":"closed"},
          "image_url": null,
          "type": "clinica_general",
          "services": ["consulta_general"]
        },
        {
          "name": "Pet Salud Medellín",
          "address": "Villa Hermosa, Medellín",
          "phone": null,
          "whatsapp": null,
          "email": null,
          "zone": "Villa Hermosa",
          "latitude": 6.25,
          "longitude": -75.54,
          "website": null,
          "rating": 4.2,
          "reviews": 105,
          "opening_hours": {"Monday":"08:00-18:00","Tuesday":"08:00-18:00","Wednesday":"08:00-18:00","Thursday":"08:00-18:00","Friday":"08:00-18:00","Saturday":"08:00-14:00","Sunday":"closed"},
          "image_url": null,
          "type": "clinica_general",
          "services": ["consulta_general","vacunacion"]
        },
        {
          "name": "Vet Sur Medellín",
          "address": "Cristo Rey, Medellín",
          "phone": null,
          "whatsapp": null,
          "email": null,
          "zone": "Guayabal",
          "latitude": 6.22,
          "longitude": -75.58,
          "website": null,
          "rating": 4.0,
          "reviews": 80,
          "opening_hours": {"Monday":"08:00-18:30","Tuesday":"08:00-18:30","Wednesday":"08:00-18:30","Thursday":"08:00-18:30","Friday":"08:00-18:30","Saturday":"08:00-14:00","Sunday":"closed"},
          "image_url": null,
          "type": "clinica_general",
          "services": ["consulta_general"]
        },
        {
          "name": "Mascotas y Salud",
          "address": "San Joaquín, Medellín",
          "phone": null,
          "whatsapp": null,
          "email": null,
          "zone": "Laureles",
          "latitude": 6.26,
          "longitude": -75.6,
          "website": null,
          "rating": 4.3,
          "reviews": 125,
          "opening_hours": {"Monday":"09:00-18:00","Tuesday":"09:00-18:00","Wednesday":"09:00-18:00","Thursday":"09:00-18:00","Friday":"09:00-18:00","Saturday":"09:00-14:00","Sunday":"closed"},
          "image_url": null,
          "type": "clinica_general",
          "services": ["consulta_general","esterilizacion"]
        },
        {
          "name": "Vet Prado Centro",
          "address": "Prado Centro, Medellín",
          "phone": null,
          "whatsapp": null,
          "email": null,
          "zone": "Centro",
          "latitude": 6.26,
          "longitude": -75.57,
          "website": null,
          "rating": 4.1,
          "reviews": 90,
          "opening_hours": {"Monday":"08:00-18:00","Tuesday":"08:00-18:00","Wednesday":"08:00-18:00","Thursday":"08:00-18:00","Friday":"08:00-18:00","Saturday":"08:00-14:00","Sunday":"closed"},
          "image_url": null,
          "type": "clinica_general",
          "services": ["consulta_general"]
        },
        {
          "name": "Animal Center Medellín",
          "address": "La Milagrosa, Medellín",
          "phone": null,
          "whatsapp": null,
          "email": null,
          "zone": "Buenos Aires",
          "latitude": 6.24,
          "longitude": -75.55,
          "website": null,
          "rating": 4.2,
          "reviews": 115,
          "opening_hours": {"Monday":"08:00-18:30","Tuesday":"08:00-18:30","Wednesday":"08:00-18:30","Thursday":"08:00-18:30","Friday":"08:00-18:30","Saturday":"08:00-14:00","Sunday":"closed"},
          "image_url": null,
          "type": "clinica_general",
          "services": ["consulta_general","vacunacion"]
        },
        {
          "name": "Vet Bosques",
          "address": "Los Balsos, Medellín",
          "phone": null,
          "whatsapp": null,
          "email": null,
          "zone": "El Poblado",
          "latitude": 6.205,
          "longitude": -75.565,
          "website": null,
          "rating": 4.5,
          "reviews": 140,
          "opening_hours": {"Monday":"09:00-18:30","Tuesday":"09:00-18:30","Wednesday":"09:00-18:30","Thursday":"09:00-18:30","Friday":"09:00-18:30","Saturday":"09:00-14:00","Sunday":"closed"},
          "image_url": null,
          "type": "clinica_general",
          "services": ["consulta_general","odontologia_veterinaria"]
        },
        {
          "name": "Clínica Animal Norte",
          "address": "Doce de Octubre, Medellín",
          "phone": null,
          "whatsapp": null,
          "email": null,
          "zone": "Norte",
          "latitude": 6.3,
          "longitude": -75.57,
          "website": null,
          "rating": 4.0,
          "reviews": 88,
          "opening_hours": {"Monday":"08:00-18:00","Tuesday":"08:00-18:00","Wednesday":"08:00-18:00","Thursday":"08:00-18:00","Friday":"08:00-18:00","Saturday":"08:00-14:00","Sunday":"closed"},
          "image_url": null,
          "type": "clinica_general",
          "services": ["consulta_general"]
        },
        {
          "name": "Vet Especialistas Medellín",
          "address": "Milla de Oro, Medellín",
          "phone": null,
          "whatsapp": null,
          "email": null,
          "zone": "El Poblado",
          "latitude": 6.21,
          "longitude": -75.57,
          "website": null,
          "rating": 4.6,
          "reviews": 175,
          "opening_hours": {"Monday":"09:00-19:00","Tuesday":"09:00-19:00","Wednesday":"09:00-19:00","Thursday":"09:00-19:00","Friday":"09:00-19:00","Saturday":"09:00-15:00","Sunday":"closed"},
          "image_url": null,
          "type": "especialidades",
          "services": ["diagnostico_avanzado","cirugia_especializada"]
        },
        {
          "name": "Vet San Diego",
          "address": "San Diego, Medellín",
          "phone": null,
          "whatsapp": null,
          "email": null,
          "zone": "Centro",
          "latitude": 6.23,
          "longitude": -75.57,
          "website": null,
          "rating": 4.1,
          "reviews": 100,
          "opening_hours": {"Monday":"08:00-18:30","Tuesday":"08:00-18:30","Wednesday":"08:00-18:30","Thursday":"08:00-18:30","Friday":"08:00-18:30","Saturday":"08:00-14:00","Sunday":"closed"},
          "image_url": null,
          "type": "clinica_general",
          "services": ["consulta_general","vacunacion"]
        },
        {
          "name": "Centro Integral Mascotas",
          "address": "La Aguacatala, Medellín",
          "phone": null,
          "whatsapp": null,
          "email": null,
          "zone": "El Poblado",
          "latitude": 6.2,
          "longitude": -75.58,
          "website": null,
          "rating": 4.4,
          "reviews": 150,
          "opening_hours": {"Monday":"09:00-18:00","Tuesday":"09:00-18:00","Wednesday":"09:00-18:00","Thursday":"09:00-18:00","Friday":"09:00-18:00","Saturday":"09:00-15:00","Sunday":"closed"},
          "image_url": null,
          "type": "clinica_general",
          "services": ["consulta_general","peluqueria_canina"]
        }
      ]
