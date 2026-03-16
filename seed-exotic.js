require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl:      { rejectUnauthorized: false },
});

// Owners seed IDs
const OWNERS = [263, 264, 265, 266, 267, 268, 269, 270, 271, 272];

async function insertAnimalType(client, name) {
  const exists = await client.query('SELECT animal_type_id FROM animal_types WHERE name = $1', [name]);
  if (exists.rows.length > 0) {
    console.log(`  ⤷ animal_type "${name}" ya existe (id ${exists.rows[0].animal_type_id})`);
    return exists.rows[0].animal_type_id;
  }
  const r = await client.query('INSERT INTO animal_types (name) VALUES ($1) RETURNING animal_type_id', [name]);
  console.log(`  + animal_type "${name}" creado (id ${r.rows[0].animal_type_id})`);
  return r.rows[0].animal_type_id;
}

async function insertPet(client, { owner_id, name, animal_type_id, breed, birth_date, weight }) {
  const exists = await client.query(
    'SELECT pet_id FROM pets WHERE user_id = $1 AND name = $2',
    [owner_id, name]
  );
  if (exists.rows.length > 0) {
    console.log(`    ⤷ mascota "${name}" ya existe para owner ${owner_id}`);
    return;
  }
  await client.query(
    `INSERT INTO pets (user_id, name, animal_type_id, breed, birth_date, weight_kg)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [owner_id, name, animal_type_id, breed, birth_date, weight]
  );
  console.log(`    + mascota "${name}" (${breed}) → owner ${owner_id}`);
}

async function seedExotic() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    console.log('\n== ANIMAL TYPES EXÓTICOS ==');
    const types = {};
    types.loro      = await insertAnimalType(client, 'Loro');
    types.erizo     = await insertAnimalType(client, 'Erizo');
    types.iguana    = await insertAnimalType(client, 'Iguana');
    types.huron     = await insertAnimalType(client, 'Hurón');
    types.raton     = await insertAnimalType(client, 'Ratón');
    types.rata      = await insertAnimalType(client, 'Rata');
    types.serpiente = await insertAnimalType(client, 'Serpiente');
    types.tarantula = await insertAnimalType(client, 'Tarántula');
    // Tortuga y Hamster ya existen

    console.log('\n== MASCOTAS EXÓTICAS ==');
    const pets = [
      // Loros
      { owner_id: OWNERS[0], name: 'Perico',    animal_type_id: types.loro,      breed: 'Cotorra Alejandrina',  birth_date: '2020-03-10', weight: 0.25 },
      { owner_id: OWNERS[1], name: 'Lola',      animal_type_id: types.loro,      breed: 'Guacamaya roja',       birth_date: '2018-07-22', weight: 1.10 },
      { owner_id: OWNERS[2], name: 'Pancho',    animal_type_id: types.loro,      breed: 'Loro amazonas',        birth_date: '2019-11-05', weight: 0.45 },
      // Erizos
      { owner_id: OWNERS[3], name: 'Espinoso',  animal_type_id: types.erizo,     breed: 'Erizo africano',       birth_date: '2022-01-15', weight: 0.40 },
      { owner_id: OWNERS[4], name: 'Prickles',  animal_type_id: types.erizo,     breed: 'Erizo africano',       birth_date: '2021-08-30', weight: 0.35 },
      // Iguanas
      { owner_id: OWNERS[5], name: 'Rex',       animal_type_id: types.iguana,    breed: 'Iguana verde',         birth_date: '2019-04-18', weight: 3.20 },
      { owner_id: OWNERS[6], name: 'Cleopatra', animal_type_id: types.iguana,    breed: 'Iguana del desierto',  birth_date: '2020-09-12', weight: 1.80 },
      // Hurones
      { owner_id: OWNERS[7], name: 'Fogón',     animal_type_id: types.huron,     breed: 'Hurón doméstico',      birth_date: '2021-05-20', weight: 1.10 },
      { owner_id: OWNERS[8], name: 'Nube',      animal_type_id: types.huron,     breed: 'Hurón doméstico',      birth_date: '2022-02-14', weight: 0.85 },
      // Ratones
      { owner_id: OWNERS[9], name: 'Pipí',      animal_type_id: types.raton,     breed: 'Ratón fancy',          birth_date: '2023-03-01', weight: 0.03 },
      { owner_id: OWNERS[0], name: 'Pepé',      animal_type_id: types.raton,     breed: 'Ratón fancy',          birth_date: '2023-03-01', weight: 0.03 },
      // Ratas
      { owner_id: OWNERS[1], name: 'Remy',      animal_type_id: types.rata,      breed: 'Rata doméstica',       birth_date: '2022-10-10', weight: 0.38 },
      { owner_id: OWNERS[2], name: 'Cheddar',   animal_type_id: types.rata,      breed: 'Rata doméstica',       birth_date: '2022-11-25', weight: 0.42 },
      // Serpientes
      { owner_id: OWNERS[3], name: 'Nagini',    animal_type_id: types.serpiente, breed: 'Boa constrictor',      birth_date: '2018-06-06', weight: 4.50 },
      { owner_id: OWNERS[4], name: 'Slytherin', animal_type_id: types.serpiente, breed: 'Ball python',          birth_date: '2020-12-01', weight: 1.80 },
      { owner_id: OWNERS[5], name: 'Coral',     animal_type_id: types.serpiente, breed: 'Corn snake',           birth_date: '2021-03-15', weight: 0.65 },
      // Tarántulas
      { owner_id: OWNERS[6], name: 'Aragog',    animal_type_id: types.tarantula, breed: 'Goliath birdeater',    birth_date: '2019-08-20', weight: 0.12 },
      { owner_id: OWNERS[7], name: 'Charlotte', animal_type_id: types.tarantula, breed: 'Rosada chilena',       birth_date: '2020-05-10', weight: 0.08 },
    ];

    for (const pet of pets) {
      await insertPet(client, pet);
    }

    await client.query('COMMIT');
    console.log('\n✓ Seed exóticos completado exitosamente\n');

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('✗ Error, rollback:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

seedExotic();
