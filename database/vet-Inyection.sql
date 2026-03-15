-- ─────────────────────────────────────────────────────────────
-- SEED CLÍNICAS MEDELLÍN — 3 lotes (49 negocios)
-- Compatible con schema PAWS final
-- ─────────────────────────────────────────────────────────────

BEGIN;

-- ─────────────────────────────────────────────────────────────
-- PASO 1: Usuario seed dedicado
-- ─────────────────────────────────────────────────────────────
INSERT INTO users (name, email, password, phone, role)
VALUES ('Seed Clinicas', 'seed.clinicas@paws.local', 'nologin', NULL, 'admin')
ON CONFLICT (email) DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- PASO 2: Insertar businesses (los 3 lotes)
-- ─────────────────────────────────────────────────────────────
DO $$
DECLARE seed_uid INTEGER;
BEGIN
  SELECT user_id INTO seed_uid FROM users WHERE email = 'seed.clinicas@paws.local';

  INSERT INTO businesses
    (user_id, business_type, name, address, phone, whatsapp, email,
     zone, city, latitude, longitude, image_url, status,
     nit, nit_verified, website, rating_average, rating_count)
  VALUES

  -- ── LOTE 1 ──────────────────────────────────────────────────
  (seed_uid,'clinic', 'Clínica Veterinaria de Medellín',           'Av. Nutibara #79a34, Laureles - Estadio, Medellín', '+576044084742', NULL,            NULL, 'Laureles',    'Medellín', 6.2492552, -75.5988668, NULL, 'active', '900100001-1', 'verified', 'http://www.clinicaveterinariamedellin.com/', 4.2, 399),
  (seed_uid,'clinic', 'Vital Clínica Veterinaria de Especialistas', 'Cl. 11C Sur #48A24, El Poblado, Medellín',         '+576044441299', NULL,            NULL, 'El Poblado',  'Medellín', 6.1956090, -75.5798715, NULL, 'active', '900100002-1', 'verified', 'http://www.vital.vet/', 4.5, 925),
  (seed_uid,'clinic', 'Clínica Veterinaria Terranova',              'Cl. 56 #39-04, Centro, Medellín',                  '+573182755995', '573182755995', NULL, 'Centro',      'Medellín', 6.2494652, -75.5574176, NULL, 'active', '900100003-1', 'verified', 'https://veterinariaterranova.com/', 4.1, 2039),
  (seed_uid,'clinic', 'Animal Care Centro Veterinario',             'Cl. 32C #80A-100, Belén, Medellín',                '+576044442706', NULL,            NULL, 'Belén',       'Medellín', 6.2360122, -75.6020243, NULL, 'active', '900100004-1', 'verified', NULL, 4.4, 404),
  (seed_uid,'clinic', 'Caninos y Felinos',                          'Cra. 78 #47-50, Laureles, Medellín',               '+573122779528', '573122779528', NULL, 'Laureles',    'Medellín', 6.2569873, -75.5959005, NULL, 'active', '900100005-1', 'verified', 'http://www.caninosyfelinos.com.co/', 4.2, 868),
  (seed_uid,'clinic', 'EVI Veterinary Services',                    'Cra. 42 #16A Sur-41, El Poblado, Medellín',        '+576044483234', NULL,            NULL, 'El Poblado',  'Medellín', 6.1888470, -75.5763702, NULL, 'active', '900100006-1', 'verified', 'http://www.evi.com.co/', 4.4, 682),
  (seed_uid,'clinic', 'CIMEVET Clínica Veterinaria',                'Cl. 47D #77B-07, Laureles, Medellín',              '+576045913884', NULL,            NULL, 'Laureles',    'Medellín', 6.2577410, -75.5956065, NULL, 'active', '900100007-1', 'verified', NULL, 4.2, 316),
  (seed_uid,'clinic', 'Clínica Veterinaria El Poblado Norte',       'Cra. 43A #16-22, El Poblado, Medellín',            NULL,            NULL,            NULL, 'El Poblado',  'Medellín', 6.2115000, -75.5686000, NULL, 'active', '900100008-1', 'verified', NULL, 4.6, 280),
  (seed_uid,'clinic', 'Vet Salud Animal',                           'Robledo, Medellín',                                NULL,            NULL,            NULL, 'Robledo',     'Medellín', 6.2800000, -75.6100000, NULL, 'active', '900100009-1', 'verified', NULL, 4.3, 190),
  (seed_uid,'petshop','Pet House Medellín',                         'Av. El Poblado, Medellín',                         NULL,            NULL,            NULL, 'Sur',         'Medellín', 6.1800000, -75.5900000, NULL, 'active', '900100010-1', 'verified', NULL, 4.5, 312),
  (seed_uid,'clinic', 'Vet Center Laureles',                        'Laureles, Medellín',                               NULL,            NULL,            NULL, 'Laureles',    'Medellín', 6.2550000, -75.5900000, NULL, 'active', '900100011-1', 'verified', NULL, 4.0, 150),
  (seed_uid,'clinic', 'Animal Vet Medellín',                        'Castilla, Medellín',                               NULL,            NULL,            NULL, 'Castilla',    'Medellín', 6.2900000, -75.5800000, NULL, 'active', '900100012-1', 'verified', NULL, 4.1, 110),
  (seed_uid,'clinic', 'PetCare Medellín',                           'La América, Medellín',                             NULL,            NULL,            NULL, 'La América',  'Medellín', 6.2600000, -75.6100000, NULL, 'active', '900100013-1', 'verified', NULL, 4.2, 140),
  (seed_uid,'clinic', 'Veterinaria Mascotas Felices',               'Belén, Medellín',                                  NULL,            NULL,            NULL, 'Belén',       'Medellín', 6.2300000, -75.6000000, NULL, 'active', '900100014-1', 'verified', NULL, 4.0, 90),
  (seed_uid,'clinic', 'Centro Veterinario Laureles',                'Laureles, Medellín',                               NULL,            NULL,            NULL, 'Laureles',    'Medellín', 6.2580000, -75.5940000, NULL, 'active', '900100015-1', 'verified', NULL, 4.3, 170),
  (seed_uid,'clinic', 'Vet Integral Medellín',                      'Guayabal, Medellín',                               NULL,            NULL,            NULL, 'Guayabal',    'Medellín', 6.2100000, -75.5900000, NULL, 'active', '900100016-1', 'verified', NULL, 4.1, 120),

  -- ── LOTE 2 ──────────────────────────────────────────────────
  (seed_uid,'clinic', 'Clínica Veterinaria San Lucas',              'San Lucas, El Poblado, Medellín',                  NULL, NULL, NULL, 'El Poblado',  'Medellín', 6.1950000, -75.5650000, NULL, 'active', '900200001-1', 'verified', NULL, 4.4, 210),
  (seed_uid,'clinic', 'Vet Plus Medellín',                          'Belén Rosales, Medellín',                          NULL, NULL, NULL, 'Belén',       'Medellín', 6.2320000, -75.6050000, NULL, 'active', '900200002-1', 'verified', NULL, 4.2, 145),
  (seed_uid,'clinic', 'Clínica Veterinaria Los Colores',            'Los Colores, Medellín',                            NULL, NULL, NULL, 'Estadio',     'Medellín', 6.2680000, -75.5950000, NULL, 'active', '900200003-1', 'verified', NULL, 4.1, 132),
  (seed_uid,'clinic', 'Centro Veterinario Belén',                   'Belén La Palma, Medellín',                         NULL, NULL, NULL, 'Belén',       'Medellín', 6.2400000, -75.6100000, NULL, 'active', '900200004-1', 'verified', NULL, 4.3, 160),
  (seed_uid,'clinic', 'Vet Norte Medellín',                         'Bello límite Medellín',                            NULL, NULL, NULL, 'Norte',       'Medellín', 6.3300000, -75.5800000, NULL, 'active', '900200005-1', 'verified', NULL, 4.0, 100),
  (seed_uid,'clinic', 'Animal Life Medellín',                       'La Floresta, Medellín',                            NULL, NULL, NULL, 'Floresta',    'Medellín', 6.2700000, -75.6100000, NULL, 'active', '900200006-1', 'verified', NULL, 4.5, 220),
  (seed_uid,'clinic', 'Vet Family Medellín',                        'Itagüí límite Medellín',                           NULL, NULL, NULL, 'Sur',         'Medellín', 6.1900000, -75.6000000, NULL, 'active', '900200007-1', 'verified', NULL, 4.2, 140),
  (seed_uid,'clinic', 'Pet Vet Medellín',                           'Buenos Aires, Medellín',                           NULL, NULL, NULL, 'Buenos Aires','Medellín', 6.2400000, -75.5500000, NULL, 'active', '900200008-1', 'verified', NULL, 4.1, 118),
  (seed_uid,'clinic', 'Centro Veterinario San Javier',              'San Javier, Medellín',                             NULL, NULL, NULL, 'San Javier',  'Medellín', 6.2800000, -75.6200000, NULL, 'active', '900200009-1', 'verified', NULL, 4.0, 95),
  (seed_uid,'clinic', 'Clínica Veterinaria Boston',                 'Boston, Medellín',                                 NULL, NULL, NULL, 'Centro',      'Medellín', 6.2500000, -75.5600000, NULL, 'active', '900200010-1', 'verified', NULL, 4.3, 155),
  (seed_uid,'clinic', 'Vet Campestre Medellín',                     'Altavista, Medellín',                              NULL, NULL, NULL, 'Altavista',   'Medellín', 6.2200000, -75.6300000, NULL, 'active', '900200011-1', 'verified', NULL, 4.4, 130),
  (seed_uid,'clinic', 'Animal Health Medellín',                     'Laureles, Medellín',                               NULL, NULL, NULL, 'Laureles',    'Medellín', 6.2600000, -75.6000000, NULL, 'active', '900200012-1', 'verified', NULL, 4.2, 165),
  (seed_uid,'clinic', 'Clínica Veterinaria La América',             'La América, Medellín',                             NULL, NULL, NULL, 'La América',  'Medellín', 6.2600000, -75.6200000, NULL, 'active', '900200013-1', 'verified', NULL, 4.1, 120),
  (seed_uid,'clinic', 'Pet Clinic Medellín',                        'Manrique, Medellín',                               NULL, NULL, NULL, 'Manrique',    'Medellín', 6.2800000, -75.5600000, NULL, 'active', '900200014-1', 'verified', NULL, 4.0, 85),
  (seed_uid,'vet',    'Vet Home Medellín',                          'Aranjuez, Medellín',                               NULL, NULL, NULL, 'Aranjuez',    'Medellín', 6.2900000, -75.5700000, NULL, 'active', '900200015-1', 'verified', NULL, 4.3, 102),
  (seed_uid,'clinic', 'Mascotas Medellín Vet',                      'Prado Centro, Medellín',                           NULL, NULL, NULL, 'Centro',      'Medellín', 6.2600000, -75.5700000, NULL, 'active', '900200016-1', 'verified', NULL, 4.2, 108),
  (seed_uid,'clinic', 'Vet Integral Norte',                         'Castilla, Medellín',                               NULL, NULL, NULL, 'Castilla',    'Medellín', 6.3000000, -75.5800000, NULL, 'active', '900200017-1', 'verified', NULL, 4.1, 95),

  -- ── LOTE 3 ──────────────────────────────────────────────────
  (seed_uid,'clinic', 'Centro Veterinario Santa Mónica',            'Santa Mónica, Medellín',                           NULL, NULL, NULL, 'Santa Mónica','Medellín', 6.2700000, -75.6100000, NULL, 'active', '900300001-1', 'verified', NULL, 4.2, 120),
  (seed_uid,'clinic', 'Clínica Veterinaria Santa Gema',             'Santa Gema, Medellín',                             NULL, NULL, NULL, 'Belén',       'Medellín', 6.2350000, -75.6150000, NULL, 'active', '900300002-1', 'verified', NULL, 4.1, 98),
  (seed_uid,'clinic', 'Vet San Antonio',                            'San Antonio de Prado, Medellín',                   NULL, NULL, NULL, 'San Antonio', 'Medellín', 6.1700000, -75.6400000, NULL, 'active', '900300003-1', 'verified', NULL, 4.0, 85),
  (seed_uid,'clinic', 'Pet Clinic San Cristóbal',                   'San Cristóbal, Medellín',                          NULL, NULL, NULL, 'San Cristóbal','Medellín',6.2900000, -75.6500000, NULL, 'active', '900300004-1', 'verified', NULL, 4.3, 110),
  (seed_uid,'clinic', 'Centro Veterinario La Castellana',           'La Castellana, Medellín',                          NULL, NULL, NULL, 'Laureles',    'Medellín', 6.2620000, -75.6020000, NULL, 'active', '900300005-1', 'verified', NULL, 4.4, 135),
  (seed_uid,'clinic', 'Vet Vida Animal',                            'Campo Valdés, Medellín',                           NULL, NULL, NULL, 'Campo Valdés','Medellín', 6.2900000, -75.5600000, NULL, 'active', '900300006-1', 'verified', NULL, 4.1, 95),
  (seed_uid,'clinic', 'Pet Salud Medellín',                         'Villa Hermosa, Medellín',                          NULL, NULL, NULL, 'Villa Hermosa','Medellín',6.2500000, -75.5400000, NULL, 'active', '900300007-1', 'verified', NULL, 4.2, 105),
  (seed_uid,'clinic', 'Vet Sur Medellín',                           'Cristo Rey, Medellín',                             NULL, NULL, NULL, 'Guayabal',    'Medellín', 6.2200000, -75.5800000, NULL, 'active', '900300008-1', 'verified', NULL, 4.0, 80),
  (seed_uid,'clinic', 'Mascotas y Salud',                           'San Joaquín, Medellín',                            NULL, NULL, NULL, 'Laureles',    'Medellín', 6.2600000, -75.6000000, NULL, 'active', '900300009-1', 'verified', NULL, 4.3, 125),
  (seed_uid,'clinic', 'Vet Prado Centro',                           'Prado Centro, Medellín',                           NULL, NULL, NULL, 'Centro',      'Medellín', 6.2600000, -75.5700000, NULL, 'active', '900300010-1', 'verified', NULL, 4.1, 90),
  (seed_uid,'clinic', 'Animal Center Medellín',                     'La Milagrosa, Medellín',                           NULL, NULL, NULL, 'Buenos Aires','Medellín', 6.2400000, -75.5500000, NULL, 'active', '900300011-1', 'verified', NULL, 4.2, 115),
  (seed_uid,'clinic', 'Vet Bosques',                                'Los Balsos, Medellín',                             NULL, NULL, NULL, 'El Poblado',  'Medellín', 6.2050000, -75.5650000, NULL, 'active', '900300012-1', 'verified', NULL, 4.5, 140),
  (seed_uid,'clinic', 'Clínica Animal Norte',                       'Doce de Octubre, Medellín',                        NULL, NULL, NULL, 'Norte',       'Medellín', 6.3000000, -75.5700000, NULL, 'active', '900300013-1', 'verified', NULL, 4.0, 88),
  (seed_uid,'clinic', 'Vet Especialistas Medellín',                 'Milla de Oro, Medellín',                           NULL, NULL, NULL, 'El Poblado',  'Medellín', 6.2100000, -75.5700000, NULL, 'active', '900300014-1', 'verified', NULL, 4.6, 175),
  (seed_uid,'clinic', 'Vet San Diego',                              'San Diego, Medellín',                              NULL, NULL, NULL, 'Centro',      'Medellín', 6.2300000, -75.5700000, NULL, 'active', '900300015-1', 'verified', NULL, 4.1, 100),
  (seed_uid,'clinic', 'Centro Integral Mascotas',                   'La Aguacatala, Medellín',                          NULL, NULL, NULL, 'El Poblado',  'Medellín', 6.2000000, -75.5800000, NULL, 'active', '900300016-1', 'verified', NULL, 4.4, 150);

END $$;

-- ─────────────────────────────────────────────────────────────
-- PASO 3: Insertar en clinics
-- ─────────────────────────────────────────────────────────────
INSERT INTO clinics (business_id, service_type, is_24h)
SELECT
  b.business_id,
  'private',
  CASE WHEN b.name IN (
    'Clínica Veterinaria de Medellín',
    'Vital Clínica Veterinaria de Especialistas',
    'Clínica Veterinaria Terranova',
    'Animal Care Centro Veterinario',
    'Caninos y Felinos',
    'EVI Veterinary Services',
    'CIMEVET Clínica Veterinaria'
  ) THEN TRUE ELSE FALSE END
FROM businesses b
WHERE b.business_type = 'clinic'
  AND b.user_id = (SELECT user_id FROM users WHERE email = 'seed.clinicas@paws.local')
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- PASO 4: Insertar en vets (Vet Home Medellín)
-- ─────────────────────────────────────────────────────────────
INSERT INTO vets (business_id, license_number)
SELECT b.business_id, NULL
FROM businesses b
WHERE b.name = 'Vet Home Medellín'
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- PASO 5: Insertar en petshops (Pet House Medellín)
-- ─────────────────────────────────────────────────────────────
INSERT INTO petshops (business_id)
SELECT b.business_id
FROM businesses b
WHERE b.name = 'Pet House Medellín'
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- PASO 6: Schedules — hospitales 24h
-- ─────────────────────────────────────────────────────────────
INSERT INTO schedules (business_id, day_of_week, open_time, close_time, is_open)
SELECT b.business_id, d.day, '00:00'::TIME, '23:59'::TIME, TRUE
FROM businesses b
CROSS JOIN (VALUES
  ('Monday'),('Tuesday'),('Wednesday'),('Thursday'),('Friday'),('Saturday'),('Sunday')
) AS d(day)
WHERE b.name IN (
  'Clínica Veterinaria de Medellín',
  'Vital Clínica Veterinaria de Especialistas',
  'Clínica Veterinaria Terranova',
  'Animal Care Centro Veterinario',
  'Caninos y Felinos',
  'EVI Veterinary Services',
  'CIMEVET Clínica Veterinaria'
)
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- PASO 7: Schedules — resto de clínicas (lun-sab, dom cerrado)
-- ─────────────────────────────────────────────────────────────
INSERT INTO schedules (business_id, day_of_week, open_time, close_time, is_open)
SELECT
  b.business_id,
  d.day,
  CASE WHEN d.day = 'Sunday' THEN NULL ELSE '08:00'::TIME END,
  CASE WHEN d.day = 'Sunday'   THEN NULL
       WHEN d.day = 'Saturday' THEN '14:00'::TIME
       ELSE '18:30'::TIME END,
  CASE WHEN d.day = 'Sunday' THEN FALSE ELSE TRUE END
FROM businesses b
CROSS JOIN (VALUES
  ('Monday'),('Tuesday'),('Wednesday'),('Thursday'),('Friday'),('Saturday'),('Sunday')
) AS d(day)
WHERE b.business_type IN ('clinic','vet')
  AND b.user_id = (SELECT user_id FROM users WHERE email = 'seed.clinicas@paws.local')
  AND b.name NOT IN (
    'Clínica Veterinaria de Medellín',
    'Vital Clínica Veterinaria de Especialistas',
    'Clínica Veterinaria Terranova',
    'Animal Care Centro Veterinario',
    'Caninos y Felinos',
    'EVI Veterinary Services',
    'CIMEVET Clínica Veterinaria'
  )
ON CONFLICT DO NOTHING;

COMMIT;