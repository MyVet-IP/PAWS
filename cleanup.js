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

async function cleanup() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Get all seed user IDs
    const seedUsers = await client.query(
      `SELECT user_id FROM users WHERE email LIKE 'seed.%@paws.local'`
    );
    const seedUserIds = seedUsers.rows.map(r => r.user_id);
    if (seedUserIds.length === 0) {
      console.log('No seed data found.');
      await client.query('ROLLBACK');
      return;
    }

    // Get all seed business IDs
    const seedBiz = await client.query(
      `SELECT business_id FROM businesses WHERE user_id = ANY($1)`,
      [seedUserIds]
    );
    const bizIds = seedBiz.rows.map(r => r.business_id);
    console.log(`Found ${bizIds.length} seed businesses, ${seedUserIds.length} seed users`);

    if (bizIds.length > 0) {
      // Delete child records in order
      await client.query(`DELETE FROM schedules        WHERE business_id = ANY($1)`, [bizIds]);
      await client.query(`DELETE FROM clinic_specialties WHERE clinic_id IN (SELECT clinic_id FROM clinics WHERE business_id = ANY($1))`, [bizIds]);
      await client.query(`DELETE FROM clinic_animal_types WHERE clinic_id IN (SELECT clinic_id FROM clinics WHERE business_id = ANY($1))`, [bizIds]);
      await client.query(`DELETE FROM vet_specialties WHERE vet_id IN (SELECT vet_id FROM vets WHERE business_id = ANY($1))`, [bizIds]);
      await client.query(`DELETE FROM clinics WHERE business_id = ANY($1)`, [bizIds]);
      await client.query(`DELETE FROM vets    WHERE business_id = ANY($1)`, [bizIds]);
      await client.query(`DELETE FROM petshops WHERE business_id = ANY($1)`, [bizIds]);
      await client.query(`DELETE FROM businesses WHERE business_id = ANY($1)`, [bizIds]);
    }

    await client.query(`DELETE FROM users WHERE user_id = ANY($1)`, [seedUserIds]);

    await client.query('COMMIT');
    console.log('Limpieza completada.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error en limpieza:', err.message);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

cleanup().catch(() => process.exit(1));
