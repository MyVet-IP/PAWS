// Database connection module for PAWS
// Uses PostgreSQL via the 'pg' library with a connection pool.
// Supports SSL for Azure deployment.

const path = require('path');
const fs = require('fs');
const { Pool } = require('pg');

// Load .env from the project root.
// Using absolute path so it works regardless of CWD.
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'paws_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
};

// Azure requires SSL — enable it when DB_SSL=true in .env
if (process.env.DB_SSL === 'true') {
  DB_CONFIG.ssl = { rejectUnauthorized: false };
}

// Path to the schema file — two levels up from backend/storage/ to project root
const SCHEMA_PATH = path.join(__dirname, '..', '..', 'database', 'db.sql');

class Database {
  constructor() {
    this.pool = null;
  }

  async connect() {
    this.pool = new Pool(DB_CONFIG);
    try {
      await this.pool.query('SELECT NOW()');
      console.log('Connected to PostgreSQL');
      console.log(`Database: ${DB_CONFIG.database} @ ${DB_CONFIG.host}`);
    } catch (err) {
      console.error('Failed to connect to PostgreSQL:', err.message);
      throw err;
    }
  }

  async initialize() {
    try {
      await this.connect();

      const tableCheck = await this.get(
        "SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'"
      );

      if (parseInt(tableCheck.count) === 0) {
        console.log('No tables found — initializing schema...');
        const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
        await this.exec(schema);
        console.log('Schema initialized successfully.');
      } else {
        console.log(`Database already has ${tableCheck.count} tables.`);
      }

      return this;
    } catch (error) {
      console.error('Error initializing database:', error.message);
      throw error;
    }
  }

  // INSERT, UPDATE, DELETE — returns { changes: rowCount }
  async run(sql, params = []) {
    const result = await this.pool.query(sql, params);
    return { changes: result.rowCount };
  }

  // SELECT single row — returns object or null
  async get(sql, params = []) {
    const result = await this.pool.query(sql, params);
    return result.rows[0] || null;
  }

  // SELECT multiple rows — returns array
  async all(sql, params = []) {
    const result = await this.pool.query(sql, params);
    return result.rows;
  }

  // Execute raw SQL (for schema init, etc.)
  async exec(sql) {
    await this.pool.query(sql);
  }

  // Close the pool
  async close() {
    if (this.pool) {
      await this.pool.end();
      console.log('Database connection closed.');
    }
  }
}

module.exports = new Database();
