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

async function check() {
  const client = await pool.connect();
  try {
    const r = await client.query(`
      SELECT b.name, b.business_type, b.zone, b.latitude, b.longitude, c.is_24h
      FROM businesses b
      LEFT JOIN clinics c ON c.business_id = b.business_id
      WHERE b.status = 'active' AND b.business_type = 'clinic'
        AND b.user_id IN (SELECT user_id FROM users WHERE email LIKE 'seed.%@paws.local')
      ORDER BY b.name ASC
    `);
    console.log('Total clínicas en DB:', r.rows.length);
    const noCoords = r.rows.filter(row => !row.latitude || !row.longitude);
    const h24 = r.rows.filter(row => row.is_24h);
    console.log('Con coordenadas:', r.rows.length - noCoords.length);
    console.log('Sin coordenadas:', noCoords.length);
    console.log('Clínicas 24h:', h24.length);
    if (noCoords.length) console.log('Sin coords:', noCoords.map(row => row.name));
  } finally {
    client.release();
    await pool.end();
  }
}
check().catch(e => { console.error(e.message); process.exit(1); });
