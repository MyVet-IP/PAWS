require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl:      process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

// Inserta una fila solo si no existe (evita el problema de tipos de SELECT...WHERE NOT EXISTS)
async function insertIfNotExists(client, checkSql, checkParams, insertSql, insertParams) {
  const exists = await client.query(checkSql, checkParams);
  if (exists.rows.length === 0) {
    const res = await client.query(insertSql, insertParams);
    return res.rows[0] || null;
  }
  return exists.rows[0];
}

async function seed2() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ─────────────────────────────────────────────────────────
    // PASO 1: Animal types
    // ─────────────────────────────────────────────────────────
    const animalTypes = ['Perro', 'Gato', 'Conejo', 'Ave', 'Hamster', 'Pez', 'Tortuga', 'Reptil'];
    for (const name of animalTypes) {
      await client.query(
        `INSERT INTO animal_types (name) VALUES ($1) ON CONFLICT (name) DO NOTHING`,
        [name]
      );
    }
    const atRes = await client.query(`SELECT animal_type_id, name FROM animal_types`);
    const typeId = {};
    for (const row of atRes.rows) typeId[row.name] = row.animal_type_id;

    // ─────────────────────────────────────────────────────────
    // PASO 2: Usuarios dueños  (password: paws123)
    // ─────────────────────────────────────────────────────────
    const passwordHash = await bcrypt.hash('paws123', 10);
    const owners = [
      ['Juan Pérez',       'seed.owner1@paws.local',  '+573001112233'],
      ['María García',     'seed.owner2@paws.local',  '+573002223344'],
      ['Carlos López',     'seed.owner3@paws.local',  '+573003334455'],
      ['Ana Martínez',     'seed.owner4@paws.local',  '+573004445566'],
      ['Luis Rodríguez',   'seed.owner5@paws.local',  '+573005556677'],
      ['Sofía Hernández',  'seed.owner6@paws.local',  '+573006667788'],
      ['Diego González',   'seed.owner7@paws.local',  '+573007778899'],
      ['Valentina Torres', 'seed.owner8@paws.local',  '+573008889900'],
      ['Andrés Ramírez',   'seed.owner9@paws.local',  '+573009990011'],
      ['Isabella Vargas',  'seed.owner10@paws.local', '+573000001122'],
    ];
    const ownerIds = [];
    for (const [name, email, phone] of owners) {
      await client.query(
        `INSERT INTO users (name, email, password, phone, role)
         VALUES ($1, $2, $3, $4, 'user') ON CONFLICT (email) DO NOTHING`,
        [name, email, passwordHash, phone]
      );
      const r = await client.query(`SELECT user_id FROM users WHERE email = $1`, [email]);
      ownerIds.push(r.rows[0].user_id);
    }

    // ─────────────────────────────────────────────────────────
    // PASO 3: Mascotas
    // ─────────────────────────────────────────────────────────
    // [ownerIdx, name, animalType, breed, birthDate, weightKg]
    const petsData = [
      [0, 'Max',    'Perro',  'Labrador',         '2021-03-15', 28.5],
      [0, 'Luna',   'Gato',   'Siamés',           '2022-07-20',  4.2],
      [1, 'Rocky',  'Perro',  'Bulldog Francés',  '2020-11-05', 12.0],
      [1, 'Michi',  'Gato',   'Persa',            '2021-05-10',  3.8],
      [2, 'Bruno',  'Perro',  'Golden Retriever', '2019-08-22', 32.0],
      [2, 'Simba',  'Gato',   'Maine Coon',       '2023-01-14',  5.5],
      [3, 'Bella',  'Perro',  'Poodle',           '2022-04-18',  6.8],
      [3, 'Pelusa', 'Conejo', 'Rey de Castilla',  '2022-09-30',  2.1],
      [4, 'Thor',   'Perro',  'Pastor Alemán',    '2020-06-12', 35.0],
      [4, 'Nala',   'Perro',  'Beagle',           '2021-12-01', 10.5],
      [5, 'Coco',   'Perro',  'Chihuahua',        '2023-02-28',  2.8],
      [5, 'Piolín', 'Ave',    'Canario',          '2022-06-15',  0.02],
      [6, 'Kira',   'Perro',  'Husky',            '2021-09-08', 22.0],
      [6, 'Toby',   'Gato',   'Tabby',            '2020-03-20',  4.9],
      [7, 'Milo',   'Perro',  'Schnauzer',        '2022-01-07',  9.3],
      [7, 'Canela', 'Perro',  'Shih Tzu',         '2021-07-25',  5.1],
      [8, 'Daisy',  'Gato',   'Angora',           '2023-04-11',  3.5],
      [8, 'Loki',   'Perro',  'Doberman',         '2020-10-17', 38.0],
      [9, 'Bambi',  'Conejo', 'Holandés',         '2022-11-03',  1.8],
      [9, 'Chispa', 'Perro',  'Boxer',            '2021-04-29', 27.0],
    ];

    const petEntries = [];
    for (const [ownerIdx, petName, animalType, breed, birthDate, weight] of petsData) {
      const userId = ownerIds[ownerIdx];
      const atId   = typeId[animalType];
      if (!atId) { console.warn(`animal_type not found: ${animalType}`); continue; }

      const row = await insertIfNotExists(
        client,
        `SELECT pet_id FROM pets WHERE user_id = $1 AND name = $2`,
        [userId, petName],
        `INSERT INTO pets (user_id, name, animal_type_id, breed, birth_date, weight_kg)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING pet_id`,
        [userId, petName, atId, breed, birthDate, weight]
      );
      if (row) petEntries.push({ petId: row.pet_id, userId });
    }

    // ─────────────────────────────────────────────────────────
    // PASO 4: Más negocios — shelters, daycares, petshops, dog_walker
    // ─────────────────────────────────────────────────────────
    // [email, type, name, address, phone, whatsapp, website, zone, lat, lng, nit, ratingAvg, ratingCount]
    const bizData = [
      ['seed.albergue.medellin@paws.local',  'shelter',    'Albergue Animal Medellín',        'Cl. 58 #52-86, Centro, Medellín',      '+576044511234', null,           null,                   'Centro',     6.2550, -75.5700, '900500001-1', 4.5, 312],
      ['seed.fundacion.amigos@paws.local',   'shelter',    'Fundación Amigos de los Animales', 'Cra. 75 #35-22, Laureles, Medellín',   '+576044522345', '573001122334', null,                   'Laureles',   6.2530, -75.5960, '900500002-1', 4.8, 541],
      ['seed.refugio.patitas@paws.local',    'shelter',    'Refugio Patitas Medellín',         'Cl. 12 Sur #47-10, Envigado',          '+573184567890', null,           null,                   'Sur',        6.1730, -75.5920, '900500003-1', 4.6, 289],
      ['seed.petdaycare.poblado@paws.local', 'daycare',    'Pet Day Care El Poblado',          'Cra. 43B #11-50, El Poblado, Medellín','+576044533456', '573002233445', 'http://petdaycare.co/', 'El Poblado', 6.2050, -75.5690, '900500004-1', 4.7, 198],
      ['seed.guarderia.feliz@paws.local',    'daycare',    'Guardería Canina Feliz',           'Cra. 76 #48-20, Laureles, Medellín',   '+576044544567', null,           null,                   'Laureles',   6.2580, -75.5970, '900500005-1', 4.4, 143],
      ['seed.pet.hotel.belen@paws.local',    'daycare',    'Pet Hotel Belén',                  'Cl. 30 #74-15, Belén, Medellín',       '+573195678901', null,           null,                   'Belén',      6.2340, -75.6080, '900500006-1', 4.3, 112],
      ['seed.petzone.medellin@paws.local',   'petshop',    'Pet Zone Medellín',                'Av. El Poblado #12-30, Medellín',      '+576044555678', '573003344556', 'https://petzone.com.co/','El Poblado', 6.2090, -75.5720, '900500007-1', 4.5, 267],
      ['seed.animal.center.shop@paws.local', 'petshop',    'Animal Center Shop',               'Cra. 65 #44-10, Laureles, Medellín',   '+576044566789', null,           null,                   'Laureles',   6.2560, -75.5920, '900500008-1', 4.2, 189],
      ['seed.mascotas.shop@paws.local',      'petshop',    'Mascotas Shop Bello',              'Cra. 50 #35-80, Bello, Medellín',      '+576044577890', null,           null,                   'Norte',      6.3350, -75.5590, '900500009-1', 4.0,  95],
      ['seed.paseador.medellin@paws.local',  'dog_walker', 'Paseador Canino Medellín',         'Servicio a domicilio, Medellín',        '+573206789012', '573206789012', null,                   'Laureles',   6.2490, -75.5950, null,          4.9,  87],
    ];

    const newBizIds = [];
    for (const [email, btype, name, address, phone, whatsapp, website, zone, lat, lng, nit, rAvg, rCount] of bizData) {
      await client.query(
        `INSERT INTO users (name, email, password, role) VALUES ($1, $2, 'nologin', 'business') ON CONFLICT (email) DO NOTHING`,
        [name, email]
      );
      const uRes = await client.query(`SELECT user_id FROM users WHERE email = $1`, [email]);
      const uid = uRes.rows[0].user_id;

      const bizRow = await insertIfNotExists(
        client,
        `SELECT business_id FROM businesses WHERE user_id = $1`,
        [uid],
        `INSERT INTO businesses
           (user_id, business_type, name, address, phone, whatsapp, zone, city,
            latitude, longitude, status, nit, nit_verified, website, rating_average, rating_count)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'Medellín', $8, $9, 'active', $10, $11, $12, $13, $14)
         RETURNING business_id`,
        [uid, btype, name, address, phone, whatsapp, zone, lat, lng,
         nit, nit ? 'verified' : null, website, rAvg, rCount]
      );
      const bid = bizRow.business_id;
      newBizIds.push(bid);

      if (btype === 'shelter')    await client.query(`INSERT INTO shelters    (business_id) VALUES ($1) ON CONFLICT DO NOTHING`, [bid]);
      if (btype === 'daycare')    await client.query(`INSERT INTO daycares    (business_id) VALUES ($1) ON CONFLICT DO NOTHING`, [bid]);
      if (btype === 'petshop')    await client.query(`INSERT INTO petshops    (business_id) VALUES ($1) ON CONFLICT DO NOTHING`, [bid]);
      if (btype === 'dog_walker') await client.query(
        `INSERT INTO dog_walkers (business_id, bio, service_area)
         VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,
        [bid, 'Paseador profesional de perros. 5 años de experiencia en Medellín.', 'Laureles, El Poblado, Envigado']
      );
    }

    // Schedules para los nuevos negocios (lun–sab abierto, dom cerrado)
    for (const bid of newBizIds) {
      const hasSchedule = await client.query(`SELECT 1 FROM schedules WHERE business_id = $1 LIMIT 1`, [bid]);
      if (hasSchedule.rows.length > 0) continue;
      const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
      for (const day of days) {
        await client.query(
          `INSERT INTO schedules (business_id, day_of_week, open_time, close_time, is_open)
           VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING`,
          [bid, day,
           day === 'Sunday' ? null : '08:00',
           day === 'Sunday' ? null : (day === 'Saturday' ? '14:00' : '18:30'),
           day !== 'Sunday']
        );
      }
    }

    // ─────────────────────────────────────────────────────────
    // PASO 5: Citas
    // ─────────────────────────────────────────────────────────
    const clinicsRes = await client.query(
      `SELECT business_id FROM businesses
       WHERE business_type = 'clinic' AND status = 'active'
         AND user_id IN (SELECT user_id FROM users WHERE email LIKE 'seed.%@paws.local')
       ORDER BY business_id LIMIT 8`
    );
    const cids = clinicsRes.rows.map(r => r.business_id);

    if (petEntries.length > 0 && cids.length > 0) {
      // [petIdx, clinicIdx, date, time, status, notes]
      const appts = [
        [0,  0, '2025-11-15', '09:00', 'completed', 'Vacuna anual y revisión general'],
        [1,  1, '2025-12-03', '10:30', 'completed', 'Control de peso, dieta recomendada'],
        [2,  2, '2026-01-20', '08:00', 'completed', 'Desparasitación interna y externa'],
        [3,  0, '2026-02-10', '11:00', 'completed', 'Limpieza dental profesional'],
        [4,  3, '2026-02-28', '15:30', 'cancelled',  'Propietario no asistió'],
        [5,  1, '2026-03-05', '09:30', 'completed', 'Esterilización exitosa'],
        [6,  2, '2026-03-10', '14:00', 'completed', 'Prueba de alergia alimentaria'],
        [7,  4, '2026-03-12', '10:00', 'completed', 'Consulta general preventiva'],
        [8,  0, '2026-03-14', '08:30', 'completed', 'Herida en pata delantera, sutura'],
        [9,  3, '2026-03-15', '16:00', 'confirmed', 'Revisión post-cirugía'],
        [10, 1, '2026-03-18', '09:00', 'confirmed', 'Vacuna antirrábica'],
        [11, 5, '2026-03-20', '11:30', 'pending',   null],
        [12, 2, '2026-03-22', '13:00', 'pending',   'Primera consulta'],
        [13, 6, '2026-03-25', '10:00', 'confirmed', 'Control anual'],
        [14, 0, '2026-03-28', '09:00', 'pending',   null],
        [15, 7, '2026-04-01', '14:30', 'pending',   'Dolor abdominal leve'],
        [16, 3, '2026-04-05', '08:00', 'confirmed', 'Pre-quirúrgico esterilización'],
        [17, 1, '2026-04-08', '11:00', 'pending',   null],
        [18, 4, '2026-04-10', '15:00', 'pending',   'Revisión de peso mensual'],
        [19, 5, '2026-04-15', '09:30', 'confirmed', 'Desparasitación trimestral'],
      ];

      for (const [pi, ci, date, time, status, notes] of appts) {
        if (pi >= petEntries.length) continue;
        const { petId, userId } = petEntries[pi];
        const bizId = cids[ci % cids.length];
        await insertIfNotExists(
          client,
          `SELECT 1 FROM appointments WHERE user_id=$1 AND pet_id=$2 AND date=$3 AND time=$4`,
          [userId, petId, date, time],
          `INSERT INTO appointments (user_id, business_id, pet_id, date, time, status, notes)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [userId, bizId, petId, date, time, status, notes]
        );
      }
    }

    await client.query('COMMIT');
    console.log('Seed2 completado:');
    console.log(` - ${animalTypes.length} tipos de animales`);
    console.log(` - ${owners.length} usuarios dueños  (pass: paws123)`);
    console.log(` - ${petEntries.length} mascotas`);
    console.log(` - ${bizData.length} negocios nuevos (shelters, daycares, petshops, dog_walker)`);
    console.log(` - 20 citas`);

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error en seed2:', err.message);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed2().catch(() => process.exit(1));
