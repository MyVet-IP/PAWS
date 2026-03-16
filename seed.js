require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

const SQL = `
BEGIN;

DO $$
DECLARE
  r RECORD;
  uid INTEGER;
BEGIN
  FOR r IN SELECT * FROM (VALUES
    ('seed.clinica.medellin@paws.local',      'clinic',  'Clínica Veterinaria de Medellín',            'Av. Nutibara #79a34, Laureles - Estadio, Medellín', '+576044084742', NULL,           'http://www.clinicaveterinariamedellin.com/', 'Laureles',     6.2492552, -75.5988668, '900100001-1', 4.2, 399,  TRUE),
    ('seed.vital.especialistas@paws.local',   'clinic',  'Vital Clínica Veterinaria de Especialistas', 'Cl. 11C Sur #48A24, El Poblado, Medellín',          '+576044441299', NULL,           'http://www.vital.vet/',                     'El Poblado',   6.1956090, -75.5798715, '900100002-1', 4.5, 925,  TRUE),
    ('seed.terranova@paws.local',             'clinic',  'Clínica Veterinaria Terranova',              'Cl. 56 #39-04, Centro, Medellín',                   '+573182755995', '573182755995', 'https://veterinariaterranova.com/',          'Centro',       6.2494652, -75.5574176, '900100003-1', 4.1, 2039, TRUE),
    ('seed.animal.care@paws.local',           'clinic',  'Animal Care Centro Veterinario',             'Cl. 32C #80A-100, Belén, Medellín',                 '+576044442706', NULL,           NULL,                                        'Belén',        6.2360122, -75.6020243, '900100004-1', 4.4, 404,  TRUE),
    ('seed.caninos.felinos@paws.local',       'clinic',  'Caninos y Felinos',                          'Cra. 78 #47-50, Laureles, Medellín',                '+573122779528', '573122779528', 'http://www.caninosyfelinos.com.co/',         'Laureles',     6.2569873, -75.5959005, '900100005-1', 4.2, 868,  TRUE),
    ('seed.evi.vet@paws.local',               'clinic',  'EVI Veterinary Services',                    'Cra. 42 #16A Sur-41, El Poblado, Medellín',         '+576044483234', NULL,           'http://www.evi.com.co/',                    'El Poblado',   6.1888470, -75.5763702, '900100006-1', 4.4, 682,  TRUE),
    ('seed.cimevet@paws.local',               'clinic',  'CIMEVET Clínica Veterinaria',                'Cl. 47D #77B-07, Laureles, Medellín',               '+576045913884', NULL,           NULL,                                        'Laureles',     6.2577410, -75.5956065, '900100007-1', 4.2, 316,  TRUE),
    ('seed.elpoblado.norte@paws.local',       'clinic',  'Clínica Veterinaria El Poblado Norte',       'Cra. 43A #16-22, El Poblado, Medellín',             NULL,            NULL,           NULL,                                        'El Poblado',   6.2115000, -75.5686000, '900100008-1', 4.6, 280,  FALSE),
    ('seed.vet.salud.animal@paws.local',      'clinic',  'Vet Salud Animal',                           'Robledo, Medellín',                                 NULL,            NULL,           NULL,                                        'Robledo',      6.2800000, -75.6100000, '900100009-1', 4.3, 190,  FALSE),
    ('seed.pet.house@paws.local',             'petshop', 'Pet House Medellín',                         'Av. El Poblado, Medellín',                          NULL,            NULL,           NULL,                                        'Sur',          6.1800000, -75.5900000, '900100010-1', 4.5, 312,  FALSE),
    ('seed.vet.center.laureles@paws.local',   'clinic',  'Vet Center Laureles',                        'Laureles, Medellín',                                NULL,            NULL,           NULL,                                        'Laureles',     6.2550000, -75.5900000, '900100011-1', 4.0, 150,  FALSE),
    ('seed.animal.vet.medellin@paws.local',   'clinic',  'Animal Vet Medellín',                        'Castilla, Medellín',                                NULL,            NULL,           NULL,                                        'Castilla',     6.2900000, -75.5800000, '900100012-1', 4.1, 110,  FALSE),
    ('seed.petcare.medellin@paws.local',      'clinic',  'PetCare Medellín',                           'La América, Medellín',                              NULL,            NULL,           NULL,                                        'La América',   6.2600000, -75.6100000, '900100013-1', 4.2, 140,  FALSE),
    ('seed.mascotas.felices@paws.local',      'clinic',  'Veterinaria Mascotas Felices',               'Belén, Medellín',                                   NULL,            NULL,           NULL,                                        'Belén',        6.2300000, -75.6000000, '900100014-1', 4.0, 90,   FALSE),
    ('seed.centro.vet.laureles@paws.local',   'clinic',  'Centro Veterinario Laureles',                'Laureles, Medellín',                                NULL,            NULL,           NULL,                                        'Laureles',     6.2580000, -75.5940000, '900100015-1', 4.3, 170,  FALSE),
    ('seed.vet.integral.medellin@paws.local', 'clinic',  'Vet Integral Medellín',                      'Guayabal, Medellín',                                NULL,            NULL,           NULL,                                        'Guayabal',     6.2100000, -75.5900000, '900100016-1', 4.1, 120,  FALSE),
    ('seed.san.lucas@paws.local',             'clinic',  'Clínica Veterinaria San Lucas',              'San Lucas, El Poblado, Medellín',                   NULL,            NULL,           NULL,                                        'El Poblado',   6.1950000, -75.5650000, '900200001-1', 4.4, 210,  FALSE),
    ('seed.vet.plus@paws.local',              'clinic',  'Vet Plus Medellín',                          'Belén Rosales, Medellín',                           NULL,            NULL,           NULL,                                        'Belén',        6.2320000, -75.6050000, '900200002-1', 4.2, 145,  FALSE),
    ('seed.los.colores@paws.local',           'clinic',  'Clínica Veterinaria Los Colores',            'Los Colores, Medellín',                             NULL,            NULL,           NULL,                                        'Estadio',      6.2680000, -75.5950000, '900200003-1', 4.1, 132,  FALSE),
    ('seed.centro.vet.belen@paws.local',      'clinic',  'Centro Veterinario Belén',                   'Belén La Palma, Medellín',                          NULL,            NULL,           NULL,                                        'Belén',        6.2400000, -75.6100000, '900200004-1', 4.3, 160,  FALSE),
    ('seed.vet.norte@paws.local',             'clinic',  'Vet Norte Medellín',                         'Bello límite Medellín',                             NULL,            NULL,           NULL,                                        'Norte',        6.3300000, -75.5800000, '900200005-1', 4.0, 100,  FALSE),
    ('seed.animal.life@paws.local',           'clinic',  'Animal Life Medellín',                       'La Floresta, Medellín',                             NULL,            NULL,           NULL,                                        'Floresta',     6.2700000, -75.6100000, '900200006-1', 4.5, 220,  FALSE),
    ('seed.vet.family@paws.local',            'clinic',  'Vet Family Medellín',                        'Itagüí límite Medellín',                            NULL,            NULL,           NULL,                                        'Sur',          6.1900000, -75.6000000, '900200007-1', 4.2, 140,  FALSE),
    ('seed.pet.vet@paws.local',               'clinic',  'Pet Vet Medellín',                           'Buenos Aires, Medellín',                            NULL,            NULL,           NULL,                                        'Buenos Aires', 6.2400000, -75.5500000, '900200008-1', 4.1, 118,  FALSE),
    ('seed.san.javier@paws.local',            'clinic',  'Centro Veterinario San Javier',              'San Javier, Medellín',                              NULL,            NULL,           NULL,                                        'San Javier',   6.2800000, -75.6200000, '900200009-1', 4.0, 95,   FALSE),
    ('seed.clinica.boston@paws.local',        'clinic',  'Clínica Veterinaria Boston',                 'Boston, Medellín',                                  NULL,            NULL,           NULL,                                        'Centro',       6.2500000, -75.5600000, '900200010-1', 4.3, 155,  FALSE),
    ('seed.vet.campestre@paws.local',         'clinic',  'Vet Campestre Medellín',                     'Altavista, Medellín',                               NULL,            NULL,           NULL,                                        'Altavista',    6.2200000, -75.6300000, '900200011-1', 4.4, 130,  FALSE),
    ('seed.animal.health@paws.local',         'clinic',  'Animal Health Medellín',                     'Laureles, Medellín',                                NULL,            NULL,           NULL,                                        'Laureles',     6.2600000, -75.6000000, '900200012-1', 4.2, 165,  FALSE),
    ('seed.la.america@paws.local',            'clinic',  'Clínica Veterinaria La América',             'La América, Medellín',                              NULL,            NULL,           NULL,                                        'La América',   6.2600000, -75.6200000, '900200013-1', 4.1, 120,  FALSE),
    ('seed.pet.clinic@paws.local',            'clinic',  'Pet Clinic Medellín',                        'Manrique, Medellín',                                NULL,            NULL,           NULL,                                        'Manrique',     6.2800000, -75.5600000, '900200014-1', 4.0, 85,   FALSE),
    ('seed.vet.home@paws.local',              'clinic',  'Vet Home Medellín',                          'Aranjuez, Medellín',                                NULL,            NULL,           NULL,                                        'Aranjuez',     6.2900000, -75.5700000, '900200015-1', 4.3, 102,  FALSE),
    ('seed.mascotas.medellin.vet@paws.local', 'clinic',  'Mascotas Medellín Vet',                      'Prado Centro, Medellín',                            NULL,            NULL,           NULL,                                        'Centro',       6.2600000, -75.5700000, '900200016-1', 4.2, 108,  FALSE),
    ('seed.vet.integral.norte@paws.local',    'clinic',  'Vet Integral Norte',                         'Castilla, Medellín',                                NULL,            NULL,           NULL,                                        'Castilla',     6.3000000, -75.5800000, '900200017-1', 4.1, 95,   FALSE),
    ('seed.santa.monica@paws.local',          'clinic',  'Centro Veterinario Santa Mónica',            'Santa Mónica, Medellín',                            NULL,            NULL,           NULL,                                        'Santa Mónica', 6.2700000, -75.6100000, '900300001-1', 4.2, 120,  FALSE),
    ('seed.santa.gema@paws.local',            'clinic',  'Clínica Veterinaria Santa Gema',             'Santa Gema, Medellín',                              NULL,            NULL,           NULL,                                        'Belén',        6.2350000, -75.6150000, '900300002-1', 4.1, 98,   FALSE),
    ('seed.vet.san.antonio@paws.local',       'clinic',  'Vet San Antonio',                            'San Antonio de Prado, Medellín',                    NULL,            NULL,           NULL,                                        'San Antonio',  6.1700000, -75.6400000, '900300003-1', 4.0, 85,   FALSE),
    ('seed.san.cristobal@paws.local',         'clinic',  'Pet Clinic San Cristóbal',                   'San Cristóbal, Medellín',                           NULL,            NULL,           NULL,                                        'San Cristóbal',6.2900000, -75.6500000, '900300004-1', 4.3, 110,  FALSE),
    ('seed.la.castellana@paws.local',         'clinic',  'Centro Veterinario La Castellana',           'La Castellana, Medellín',                           NULL,            NULL,           NULL,                                        'Laureles',     6.2620000, -75.6020000, '900300005-1', 4.4, 135,  FALSE),
    ('seed.vet.vida.animal@paws.local',       'clinic',  'Vet Vida Animal',                            'Campo Valdés, Medellín',                            NULL,            NULL,           NULL,                                        'Campo Valdés', 6.2900000, -75.5600000, '900300006-1', 4.1, 95,   FALSE),
    ('seed.pet.salud@paws.local',             'clinic',  'Pet Salud Medellín',                         'Villa Hermosa, Medellín',                           NULL,            NULL,           NULL,                                        'Villa Hermosa',6.2500000, -75.5400000, '900300007-1', 4.2, 105,  FALSE),
    ('seed.vet.sur@paws.local',               'clinic',  'Vet Sur Medellín',                           'Cristo Rey, Medellín',                              NULL,            NULL,           NULL,                                        'Guayabal',     6.2200000, -75.5800000, '900300008-1', 4.0, 80,   FALSE),
    ('seed.mascotas.y.salud@paws.local',      'clinic',  'Mascotas y Salud',                           'San Joaquín, Medellín',                             NULL,            NULL,           NULL,                                        'Laureles',     6.2600000, -75.6000000, '900300009-1', 4.3, 125,  FALSE),
    ('seed.vet.prado.centro@paws.local',      'clinic',  'Vet Prado Centro',                           'Prado Centro, Medellín',                            NULL,            NULL,           NULL,                                        'Centro',       6.2600000, -75.5700000, '900300010-1', 4.1, 90,   FALSE),
    ('seed.animal.center@paws.local',         'clinic',  'Animal Center Medellín',                     'La Milagrosa, Medellín',                            NULL,            NULL,           NULL,                                        'Buenos Aires', 6.2400000, -75.5500000, '900300011-1', 4.2, 115,  FALSE),
    ('seed.vet.bosques@paws.local',           'clinic',  'Vet Bosques',                                'Los Balsos, Medellín',                              NULL,            NULL,           NULL,                                        'El Poblado',   6.2050000, -75.5650000, '900300012-1', 4.5, 140,  FALSE),
    ('seed.clinica.animal.norte@paws.local',  'clinic',  'Clínica Animal Norte',                       'Doce de Octubre, Medellín',                         NULL,            NULL,           NULL,                                        'Norte',        6.3000000, -75.5700000, '900300013-1', 4.0, 88,   FALSE),
    ('seed.vet.especialistas@paws.local',     'clinic',  'Vet Especialistas Medellín',                 'Milla de Oro, Medellín',                            NULL,            NULL,           NULL,                                        'El Poblado',   6.2100000, -75.5700000, '900300014-1', 4.6, 175,  FALSE),
    ('seed.vet.san.diego@paws.local',         'clinic',  'Vet San Diego',                              'San Diego, Medellín',                               NULL,            NULL,           NULL,                                        'Centro',       6.2300000, -75.5700000, '900300015-1', 4.1, 100,  FALSE),
    ('seed.centro.integral.mascotas@paws.local','clinic','Centro Integral Mascotas',                   'La Aguacatala, Medellín',                           NULL,            NULL,           NULL,                                        'El Poblado',   6.2000000, -75.5800000, '900300016-1', 4.4, 150,  FALSE)
  ) AS t(email_seed, business_type, name, address, phone, whatsapp, website, zone, lat, lng, nit, rating_avg, rating_count, is_24h)
  LOOP
    INSERT INTO users (name, email, password, role)
    VALUES (r.name, r.email_seed, 'nologin', 'business')
    ON CONFLICT (email) DO NOTHING;

    SELECT user_id INTO uid FROM users WHERE email = r.email_seed;

    INSERT INTO businesses
      (user_id, business_type, name, address, phone, whatsapp,
       zone, city, latitude, longitude, status,
       nit, nit_verified, website, rating_average, rating_count)
    SELECT uid, r.business_type, r.name, r.address, r.phone, r.whatsapp,
       r.zone, 'Medellín', r.lat, r.lng, 'active',
       r.nit, 'verified', r.website, r.rating_avg, r.rating_count
    WHERE NOT EXISTS (SELECT 1 FROM businesses WHERE user_id = uid);
  END LOOP;
END $$;

INSERT INTO clinics (business_id, service_type, is_24h)
SELECT b.business_id, 'private',
  CASE WHEN b.name IN (
    'Clínica Veterinaria de Medellín','Vital Clínica Veterinaria de Especialistas',
    'Clínica Veterinaria Terranova','Animal Care Centro Veterinario',
    'Caninos y Felinos','EVI Veterinary Services','CIMEVET Clínica Veterinaria'
  ) THEN TRUE ELSE FALSE END
FROM businesses b
WHERE b.business_type = 'clinic'
  AND b.user_id IN (SELECT user_id FROM users WHERE email LIKE 'seed.%@paws.local')
ON CONFLICT DO NOTHING;

INSERT INTO vets (business_id, license_number)
SELECT b.business_id, NULL FROM businesses b WHERE b.name = 'Vet Home Medellín'
ON CONFLICT DO NOTHING;

INSERT INTO petshops (business_id)
SELECT b.business_id FROM businesses b WHERE b.name = 'Pet House Medellín'
ON CONFLICT DO NOTHING;

INSERT INTO schedules (business_id, day_of_week, open_time, close_time, is_open)
SELECT b.business_id, d.day, '00:00'::TIME, '23:59'::TIME, TRUE
FROM businesses b
CROSS JOIN (VALUES ('Monday'),('Tuesday'),('Wednesday'),('Thursday'),('Friday'),('Saturday'),('Sunday')) AS d(day)
WHERE b.name IN (
  'Clínica Veterinaria de Medellín','Vital Clínica Veterinaria de Especialistas',
  'Clínica Veterinaria Terranova','Animal Care Centro Veterinario',
  'Caninos y Felinos','EVI Veterinary Services','CIMEVET Clínica Veterinaria'
)
ON CONFLICT DO NOTHING;

INSERT INTO schedules (business_id, day_of_week, open_time, close_time, is_open)
SELECT b.business_id, d.day,
  CASE WHEN d.day = 'Sunday' THEN NULL ELSE '08:00'::TIME END,
  CASE WHEN d.day = 'Sunday' THEN NULL WHEN d.day = 'Saturday' THEN '14:00'::TIME ELSE '18:30'::TIME END,
  CASE WHEN d.day = 'Sunday' THEN FALSE ELSE TRUE END
FROM businesses b
CROSS JOIN (VALUES ('Monday'),('Tuesday'),('Wednesday'),('Thursday'),('Friday'),('Saturday'),('Sunday')) AS d(day)
WHERE b.business_type IN ('clinic','vet','petshop')
  AND b.user_id IN (SELECT user_id FROM users WHERE email LIKE 'seed.%@paws.local')
  AND b.name NOT IN (
    'Clínica Veterinaria de Medellín','Vital Clínica Veterinaria de Especialistas',
    'Clínica Veterinaria Terranova','Animal Care Centro Veterinario',
    'Caninos y Felinos','EVI Veterinary Services','CIMEVET Clínica Veterinaria'
  )
ON CONFLICT DO NOTHING;

COMMIT;
`;

async function seed() {
  const client = await pool.connect();
  try {
    await client.query(SQL);
    console.log('Seed completado: 49 negocios insertados.');
  } catch (err) {
    console.error('Error en seed:', err.message);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(() => process.exit(1));
