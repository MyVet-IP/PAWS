require('dotenv').config({ path: '../.env' });
const db = require('./backend/db');

async function testConnection() {
  console.log('DATABASE CONNECTION TEST');


  try {
    console.log('Testing connection...');
    await db.connect();
    console.log('Connection established successfully\n');

    console.log('Verifying tables...');
    const tables = await db.all(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);

    if (tables.length > 0) {
      console.log(`Found ${tables.length} tables:`);
      tables.forEach(t => console.log(`  - ${t.table_name}`));
    } else {
      console.log('No tables found. Run the SQL schema.');
    }
    console.log('');


    console.log('Testing data reading...');
    const clientes = await db.all('SELECT COUNT(*) as count FROM clientes');
    const veterinarias = await db.all('SELECT COUNT(*) as count FROM veterinarias');
    const mascotas = await db.all('SELECT COUNT(*) as count FROM mascotas');

    console.log(`Clients: ${clientes[0].count}`);
    console.log(`Clinics: ${veterinarias[0].count}`);
    console.log(`Pets: ${mascotas[0].count}`);
    console.log('Data reading successful\n');

    //Close connection
    console.log('Closing connection...');
    await db.close();
    console.log('Connection closed successfully\n');

    console.log('ALL TESTS PASSED');

    process.exit(0);
  } catch (error) {
    console.error('\nERROR:', error.message);
    console.error('\nSOLUTION:');
    console.error('1. Make sure PostgreSQL is installed and running');
    console.error('2. Create the database: createdb myvet_db');
    console.error('3. Verify the credentials in the .env file');
    console.error('4. Run the schema: psql -d myvet_db -f database/db.sql\n');

    await db.close();
    process.exit(1);
  }
}

testConnection();


