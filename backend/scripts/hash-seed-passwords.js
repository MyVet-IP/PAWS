const db = require('../db');
const bcrypt = require('bcryptjs');

async function migrate() {
  try {
    await db.connect();
    const users = await db.all('SELECT id_cliente, password FROM clientes');
    for (const u of users) {
      const pw = u.password || '';
      // If password is already a bcrypt hash it usually starts with $2a$ or $2b$
      if (/^\$2[aby]\$/.test(pw)) {
        console.log(`Skipping ${u.id_cliente}, already hashed`);
        continue;
      }
      // otherwise hash and update
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(pw, salt);
      await db.run('UPDATE clientes SET password = $1 WHERE id_cliente = $2', [hashed, u.id_cliente]);
      console.log(`Updated password for user ${u.id_cliente}`);
    }
    console.log('Migration finished');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed', err);
    process.exit(1);
  }
}

migrate();
