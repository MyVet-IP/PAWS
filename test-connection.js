// Script para probar la conexión a la base de datos PostgreSQL
//Archivo importante, no borrar ni modificar sin entenderlo completamente, mejor dicho no lo toquen muchas gracias
//Repito no me muevan esto porque es importante para verificar que la base de datos esté funcionando correctamente antes de ejecutar el backend

require('dotenv').config();
const db = require('./backend/db');

async function testConnection() {
  console.log('PRUEBA DE CONEXIÓN A BASE DE DATOS');


  try {
    console.log('Probando conexión...');
    await db.connect();
    console.log('Conexión establecida correctamente\n');

    console.log('Verificando tablas...');
    const tables = await db.all(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);
    
    if (tables.length > 0) {
      console.log(`Se encontraron ${tables.length} tablas:`);
      tables.forEach(t => console.log(`  - ${t.table_name}`));
    } else {
      console.log('No se encontraron tablas. Ejecuta el schema SQL.');
    }
    console.log('');

    // Verificar datos de ejemplo
    console.log('Probando lectura de datos...');
    const clientes = await db.all('SELECT COUNT(*) as count FROM clientes');
    const veterinarias = await db.all('SELECT COUNT(*) as count FROM veterinarias');
    const mascotas = await db.all('SELECT COUNT(*) as count FROM mascotas');
    
    console.log(`Clientes: ${clientes[0].count}`);
    console.log(`Veterinarias: ${veterinarias[0].count}`);
    console.log(`Mascotas: ${mascotas[0].count}`);
    console.log('Lectura de datos exitosa\n');

    //Cerrar conexión
    console.log('Cerrando conexión...');
    await db.close();
    console.log('Conexión cerrada correctamente\n');

    console.log('TODAS LAS PRUEBAS PASARON');
    
    process.exit(0);
    } catch (error) {
    console.error('\nERROR:', error.message);
    console.error('\nSOLUCIÓN:');
    console.error('1. Asegúrate de que PostgreSQL esté instalado y corriendo');
    console.error('2. Crea la base de datos: createdb myvet_db');
    console.error('3. Verifica las credenciales en el archivo .env');
    console.error('4. Ejecuta el schema: psql -d myvet_db -f database/db.sql\n');
    
    await db.close();
    process.exit(1);
  }
}

testConnection();


