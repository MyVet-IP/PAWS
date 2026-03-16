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

async function run() {
  const client = await pool.connect();
  try {
    // ── Schema migrations ──────────────────────────────────────
    await client.query(`ALTER TABLE businesses ADD COLUMN IF NOT EXISTS website VARCHAR(500);`);
    console.log('businesses.website OK');

    await client.query(`ALTER TABLE businesses ADD COLUMN IF NOT EXISTS city VARCHAR(100);`);
    console.log('businesses.city OK');

    await client.query(`ALTER TABLE businesses ADD COLUMN IF NOT EXISTS rating_average DECIMAL(3,2) DEFAULT 0.00;`);
    console.log('businesses.rating_average OK');

    await client.query(`ALTER TABLE businesses ADD COLUMN IF NOT EXISTS rating_count INTEGER DEFAULT 0;`);
    console.log('businesses.rating_count OK');

    await client.query(`ALTER TABLE clinics DROP COLUMN IF EXISTS rating;`);
    console.log('clinics.rating removed OK');

    await client.query(`
      CREATE TABLE IF NOT EXISTS refresh_tokens (
        id         SERIAL PRIMARY KEY,
        user_id    INTEGER NOT NULL,
        token      VARCHAR(512) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
      );
    `);
    console.log('refresh_tokens OK');

    await client.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        review_id   SERIAL PRIMARY KEY,
        business_id INTEGER NOT NULL REFERENCES businesses(business_id) ON DELETE CASCADE,
        user_id     INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        rating      INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment     TEXT,
        created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(business_id, user_id)
      );
    `);
    console.log('reviews table OK');

    // ── Real schedules (by name, not hardcoded ID) ───────────
    await client.query(`
      INSERT INTO schedules (business_id, day_of_week, open_time, close_time, is_open)
      SELECT b.business_id, d.day, '00:00'::TIME, '23:59'::TIME, TRUE
      FROM businesses b
      CROSS JOIN (VALUES ('Monday'),('Tuesday'),('Wednesday'),('Thursday'),('Friday'),('Saturday'),('Sunday')) AS d(day)
      WHERE b.name = 'Clinica Veterinaria El Poblado'
      ON CONFLICT DO NOTHING;
    `);

    await client.query(`
      INSERT INTO schedules (business_id, day_of_week, open_time, close_time, is_open)
      SELECT b.business_id, d.day,
        CASE WHEN d.day = 'Sunday' THEN NULL ELSE '08:00'::TIME END,
        CASE WHEN d.day = 'Sunday' THEN NULL WHEN d.day = 'Saturday' THEN '13:00'::TIME ELSE '18:00'::TIME END,
        CASE WHEN d.day = 'Sunday' THEN FALSE ELSE TRUE END
      FROM businesses b
      CROSS JOIN (VALUES ('Monday'),('Tuesday'),('Wednesday'),('Thursday'),('Friday'),('Saturday'),('Sunday')) AS d(day)
      WHERE b.name = 'Centro Medico Veterinario Laureles'
      ON CONFLICT DO NOTHING;
    `);

    await client.query(`
      INSERT INTO schedules (business_id, day_of_week, open_time, close_time, is_open)
      SELECT b.business_id, d.day,
        CASE WHEN d.day = 'Sunday' THEN NULL ELSE '07:00'::TIME END,
        CASE WHEN d.day = 'Sunday' THEN NULL WHEN d.day = 'Saturday' THEN '14:00'::TIME ELSE '19:00'::TIME END,
        CASE WHEN d.day = 'Sunday' THEN FALSE ELSE TRUE END
      FROM businesses b
      CROSS JOIN (VALUES ('Monday'),('Tuesday'),('Wednesday'),('Thursday'),('Friday'),('Saturday'),('Sunday')) AS d(day)
      WHERE b.name IN ('Guarderia Caniland', 'Daycare Caniland', 'Caniland')
      ON CONFLICT DO NOTHING;
    `);
    console.log('Schedules OK');

    console.log('\nAll done.');
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch(err => { console.error(err.message); process.exit(1); });
