// Módulo de conexión a base de datos PostgreSQL
require('dotenv').config();
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

// Configuración de la base de datos PostgreSQL
const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'myvet_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
};

const SCHEMA_PATH = path.join(__dirname, '..', 'database', 'db.sql');

class Database {
  constructor() {
    this.pool = null;
  }

  // Conectar a la base de datos
  connect() {
    return new Promise((resolve, reject) => {
      try {
        this.pool = new Pool(DB_CONFIG);
        
        // Probar la conexión
        this.pool.query('SELECT NOW()', (err, result) => {
          if (err) {
            console.error('Error al conectar a la base de datos PostgreSQL:', err);
            reject(err);
          } else {
            console.log('✅ Conexión exitosa a la base de datos PostgreSQL');
            console.log(`📊 Base de datos: ${DB_CONFIG.database}`);
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // Inicializar la base de datos con el schema si no existe
  async initialize() {
    try {
      await this.connect();

      // Verificar si las tablas ya existen
      const tableCheck = await this.get(
        "SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'"
      );

      if (parseInt(tableCheck.count) === 0) {
        console.log('🔧 Inicializando schema de base de datos...');
        const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
        await this.exec(schema);
        console.log('✅ Schema inicializado correctamente');
      } else {
        console.log(`📋 Base de datos ya contiene ${tableCheck.count} tablas`);
      }

      return this;
    } catch (error) {
      console.error('❌ Error al inicializar la base de datos:', error);
      throw error;
    }
  }

  // Ejecutar una consulta que no devuelve resultados (INSERT, UPDATE, DELETE)
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          // Para compatibilidad con SQLite, devolver lastID y changes
          const lastID = result.rows && result.rows[0] ? result.rows[0].id : result.insertId || null;
          resolve({ 
            lastID: lastID,
            changes: result.rowCount 
          });
        }
      });
    });
  }

  // Ejecutar una consulta que devuelve una sola fila
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

  // Ejecutar una consulta que devuelve múltiples filas
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

  // Ejecutar múltiples sentencias SQL
  async exec(sql) {
    try {
      await this.pool.query(sql);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Cerrar la conexión
  close() {
    return new Promise((resolve, reject) => {
      if (this.pool) {
        this.pool.end((err) => {
          if (err) {
            reject(err);
          } else {
            console.log('🔒 Conexión a base de datos cerrada');
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }
}

// Exportar instancia única
const database = new Database();

module.exports = database;
