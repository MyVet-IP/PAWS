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

async function run() {
  const client = await pool.connect();
  try {
    await client.query('ALTER TABLE pets ADD COLUMN IF NOT EXISTS gender VARCHAR(10)');
    console.log('+ gender agregado');
    await client.query('ALTER TABLE pets ADD COLUMN IF NOT EXISTS color VARCHAR(80)');
    console.log('+ color agregado');
    await client.query('ALTER TABLE pets ADD COLUMN IF NOT EXISTS notes TEXT');
    console.log('+ notes agregado');
    console.log('\n✓ Listo');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

run();
