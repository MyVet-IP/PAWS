const db = require('./db');

class Storage {
  async getAllClientes() {
    return await db.all(
      'SELECT id_cliente, nombre, email, telefono FROM clientes ORDER BY id_cliente ASC'
    );
  }

  async getClienteById(id) {
    return await db.get(
      'SELECT id_cliente, nombre, email, telefono FROM clientes WHERE id_cliente = $1',
      [id]
    );
  }

  async getClienteByEmail(email) {
    return await db.get(
      'SELECT * FROM clientes WHERE email = $1',
      [email]
    );
  }

  async createCliente(nombre, email, password, telefono = null) {
    const result = await db.get(
      'INSERT INTO clientes (nombre, email, password, telefono) VALUES ($1, $2, $3, $4) RETURNING id_cliente',
      [nombre, email, password, telefono]
    );
    return await this.getClienteById(result.id_cliente);
  }

  async updateCliente(id, data) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (data.nombre !== undefined) {
      fields.push(`nombre = $${paramCount++}`);
      values.push(data.nombre);
    }
    if (data.email !== undefined) {
      fields.push(`email = $${paramCount++}`);
      values.push(data.email);
    }
    if (data.telefono !== undefined) {
      fields.push(`telefono = $${paramCount++}`);
      values.push(data.telefono);
    }

    values.push(id);

    await db.run(
      `UPDATE clientes SET ${fields.join(', ')} WHERE id_cliente = $${paramCount}`,
      values
    );

    return await this.getClienteById(id);
  }

  async getAllVeterinarias() {
    const veterinarias = await db.all(
      'SELECT * FROM veterinarias ORDER BY id_veterinaria ASC'
    );

    for (let vet of veterinarias) {
      vet.specialties = await this.getSpecialtiesByVeterinaria(vet.id_veterinaria);
    }

    return veterinarias;
  }

  async getVeterinariaById(id) {
    const veterinaria = await db.get(
      'SELECT * FROM veterinarias WHERE id_veterinaria = $1',
      [id]
    );

    if (veterinaria) {
      veterinaria.specialties = await this.getSpecialtiesByVeterinaria(id);
    }

    return veterinaria;
  }

  async getVeterinariasByLocation(location) {
    const veterinarias = await db.all(
      'SELECT * FROM veterinarias WHERE direccion LIKE $1 OR estado LIKE $2',
      [`%${location}%`, `%${location}%`]
    );

    for (let vet of veterinarias) {
      vet.specialties = await this.getSpecialtiesByVeterinaria(vet.id_veterinaria);
    }

    return veterinarias;
  }

  async createVeterinaria(nombre, direccion, telefono = null, estado = 'Activa', rating = 0, imagen = null) {
    const result = await db.get(
      'INSERT INTO veterinarias (nombre, direccion, telefono, estado, rating, imagen) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_veterinaria',
      [nombre, direccion, telefono, estado, rating, imagen]
    );
    return await this.getVeterinariaById(result.id_veterinaria);
  }

  async getAllSpecialties() {
    return await db.all('SELECT * FROM specialties ORDER BY id_specialty ASC');
  }

  async getSpecialtyById(id) {
    return await db.get('SELECT * FROM specialties WHERE id_specialty = $1', [id]);
  }

  async getSpecialtiesByVeterinaria(id_veterinaria) {
    return await db.all(
      `SELECT s.* FROM specialties s
       INNER JOIN vet_specialties vs ON s.id_specialty = vs.id_specialty
       WHERE vs.id_veterinaria = $1`,
      [id_veterinaria]
    );
  }

  async createSpecialty(name) {
    const result = await db.get(
      'INSERT INTO specialties (name) VALUES ($1) RETURNING id_specialty',
      [name]
    );
    return await this.getSpecialtyById(result.id_specialty);
  }

  async addSpecialtyToVeterinaria(id_veterinaria, id_specialty) {
    await db.run(
      'INSERT INTO vet_specialties (id_veterinaria, id_specialty) VALUES ($1, $2)',
      [id_veterinaria, id_specialty]
    );
    return { success: true };
  }

  async getAllMascotas() {
    return await db.all(
      `SELECT m.*, c.nombre AS cliente_nombre
       FROM mascotas m
       INNER JOIN clientes c ON c.id_cliente = m.id_cliente
       ORDER BY m.id_mascota ASC`
    );
  }

  async getMascotaById(id) {
    return await db.get(
      `SELECT m.*, c.nombre AS cliente_nombre, c.email AS cliente_email, c.telefono AS cliente_telefono
       FROM mascotas m
       INNER JOIN clientes c ON c.id_cliente = m.id_cliente
       WHERE m.id_mascota = $1`,
      [id]
    );
  }

  async getMascotasByCliente(id_cliente) {
    return await db.all(
      'SELECT * FROM mascotas WHERE id_cliente = $1 ORDER BY id_mascota ASC',
      [id_cliente]
    );
  }

  async createMascota(nombre, especie, raza = null, edad = null, id_cliente) {
    const result = await db.get(
      'INSERT INTO mascotas (nombre, especie, raza, edad, id_cliente) VALUES ($1, $2, $3, $4, $5) RETURNING id_mascota',
      [nombre, especie, raza, edad, id_cliente]
    );
    return await this.getMascotaById(result.id_mascota);
  }

  async updateMascota(id, data) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (data.nombre !== undefined) {
      fields.push(`nombre = $${paramCount++}`);
      values.push(data.nombre);
    }
    if (data.especie !== undefined) {
      fields.push(`especie = $${paramCount++}`);
      values.push(data.especie);
    }
    if (data.raza !== undefined) {
      fields.push(`raza = $${paramCount++}`);
      values.push(data.raza);
    }
    if (data.edad !== undefined) {
      fields.push(`edad = $${paramCount++}`);
      values.push(data.edad);
    }

    values.push(id);

    await db.run(
      `UPDATE mascotas SET ${fields.join(', ')} WHERE id_mascota = $${paramCount}`,
      values
    );

    return await this.getMascotaById(id);
  }

  async getAllVisitas() {
    return await db.all(
      `SELECT v.*, m.nombre AS mascota_nombre, vet.nombre AS veterinaria_nombre
       FROM visitas v
       INNER JOIN mascotas m ON m.id_mascota = v.id_mascota
       INNER JOIN veterinarias vet ON vet.id_veterinaria = v.id_veterinaria
       ORDER BY v.fecha DESC`
    );
  }

  async getVisitaById(id) {
    return await db.get(
      `SELECT v.*, m.nombre AS mascota_nombre, vet.nombre AS veterinaria_nombre
       FROM visitas v
       INNER JOIN mascotas m ON m.id_mascota = v.id_mascota
       INNER JOIN veterinarias vet ON vet.id_veterinaria = v.id_veterinaria
       WHERE v.id_visita = $1`,
      [id]
    );
  }

  async getVisitasByMascota(id_mascota) {
    return await db.all(
      `SELECT v.*, vet.nombre AS veterinaria_nombre
       FROM visitas v
       INNER JOIN veterinarias vet ON vet.id_veterinaria = v.id_veterinaria
       WHERE v.id_mascota = $1
       ORDER BY v.fecha DESC`,
      [id_mascota]
    );
  }

  async createVisita(diagnostico = null, medicamentos = null, chequeos = null, id_mascota, id_veterinaria) {
    const result = await db.get(
      'INSERT INTO visitas (diagnostico, medicamentos, chequeos, id_mascota, id_veterinaria) VALUES ($1, $2, $3, $4, $5) RETURNING id_visita',
      [diagnostico, medicamentos, chequeos, id_mascota, id_veterinaria]
    );
    return await this.getVisitaById(result.id_visita);
  }

  async getAllEmergencias() {
    return await db.all(
      `SELECT e.*, m.nombre AS mascota_nombre, vet.nombre AS veterinaria_nombre
       FROM emergencias e
       INNER JOIN mascotas m ON m.id_mascota = e.id_mascota
       INNER JOIN veterinarias vet ON vet.id_veterinaria = e.id_veterinaria
       ORDER BY e.fecha DESC`
    );
  }

  async getEmergenciaById(id) {
    return await db.get(
      `SELECT e.*, m.nombre AS mascota_nombre, vet.nombre AS veterinaria_nombre
       FROM emergencias e
       INNER JOIN mascotas m ON m.id_mascota = e.id_mascota
       INNER JOIN veterinarias vet ON vet.id_veterinaria = e.id_veterinaria
       WHERE e.id_emergencia = $1`,
      [id]
    );
  }

  async createEmergencia(descripcion, id_mascota, id_veterinaria) {
    const result = await db.get(
      'INSERT INTO emergencias (descripcion, id_mascota, id_veterinaria) VALUES ($1, $2, $3) RETURNING id_emergencia',
      [descripcion, id_mascota, id_veterinaria]
    );
    return await this.getEmergenciaById(result.id_emergencia);
  }

  async createEmergencyMessage(mensaje, nombre_contacto, telefono_contacto, id_veterinaria, id_emergencia = null) {
    const row = await db.get(
      `INSERT INTO emergency_messages (mensaje, nombre_contacto, telefono_contacto, id_veterinaria, id_emergencia)
       VALUES ($1, $2, $3, $4, $5) RETURNING id_mensaje`,
      [mensaje, nombre_contacto, telefono_contacto, id_veterinaria, id_emergencia]
    );
    return await db.get('SELECT * FROM emergency_messages WHERE id_mensaje = $1', [row.id_mensaje]);
  }

  async getAllEmergencyMessages() {
    return await db.all(
      `SELECT em.*, v.nombre AS veterinaria_nombre, v.whatsapp
       FROM emergency_messages em
       JOIN veterinarias v ON v.id_veterinaria = em.id_veterinaria
       ORDER BY em.fecha DESC`
    );
  }

  async getEmergencyMessagesByVeterinaria(id_veterinaria) {
    return await db.all(
      'SELECT * FROM emergency_messages WHERE id_veterinaria = $1 ORDER BY fecha DESC',
      [id_veterinaria]
    );
  }

  async getUserDashboard(id_cliente) {
    const cliente = await this.getClienteById(id_cliente);
    const mascotas = await this.getMascotasByCliente(id_cliente);

    for (let mascota of mascotas) {
      mascota.visitas = await this.getVisitasByMascota(mascota.id_mascota);
    }

    return {
      cliente,
      mascotas
    };
  }
}

module.exports = new Storage();
