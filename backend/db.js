require('dotenv').config({ path: '../.env' });
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = pool;

const path = require('path');
const fs = require('fs');

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'myvet_db',
  user: process.env.DB_USER || 'ulith',
  password: process.env.DB_PASSWORD || 'Uge1011390919.',
};

const SCHEMA_PATH = path.join(__dirname, '..', 'database', 'db.sql');

class Database {
  constructor() {
    this.pool = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      try {
        this.pool = new Pool(DB_CONFIG);
        this.pool.query('SELECT NOW()', (err, result) => {
          if (err) {
            console.error('Failed to connect to PostgreSQL:', err);
            reject(err);
          } else {
            console.log('Connected to PostgreSQL');
            console.log(`Database: ${DB_CONFIG.database}`);
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async initialize() {
    try {
      await this.connect();

      const tableCheck = await this.get(
        "SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'"
      );

      if (parseInt(tableCheck.count) === 0) {
        console.log('Initializing database schema...');
        const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
        await this.exec(schema);
        console.log('Schema initialized');
      } else {
        console.log(`Database has ${tableCheck.count} tables`);
      }

      return this;
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const lastID = result.rows && result.rows[0] ? result.rows[0].id : result.insertId || null;
          resolve({
            lastID: lastID,
            changes: result.rowCount
          });
        }
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows[0] || null);
        }
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      });
    });
  }

  async exec(sql) {
    try {
      await this.pool.query(sql);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  close() {
    return new Promise((resolve, reject) => {
      if (this.pool) {
        this.pool.end((err) => {
          if (err) {
            reject(err);
          } else {
            console.log('Database connection closed');
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }
}

const database = new Database();

module.exports = database;
