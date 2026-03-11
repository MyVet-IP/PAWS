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
      vet.servicios = await this.getServiciosByVeterinaria(vet.id_veterinaria);
    }

    return veterinarias;
  }

  async getVeterinariaById(id) {
    const veterinaria = await db.get(
      'SELECT * FROM veterinarias WHERE id_veterinaria = $1',
      [id]
    );

    if (veterinaria) {
      veterinaria.servicios = await this.getServiciosByVeterinaria(id);
    }

    return veterinaria;
  }

  async getVeterinariasByLocation(location) {
    const veterinarias = await db.all(
      'SELECT * FROM veterinarias WHERE direccion LIKE $1 OR estado LIKE $2',
      [`%${location}%`, `%${location}%`]
    );

    for (let vet of veterinarias) {
      vet.servicios = await this.getServiciosByVeterinaria(vet.id_veterinaria);
    }

    return veterinarias;
  }
  
  async getVeterinariasByCoords(lat, lng, radiusKm = 10, servicio = null, ratingMin = null) {
    // Fórmula de Haversine en SQL puro (La formula Haversine es una fórmula utilizada 
    // para calcular la distancia entre dos puntos de una esfera dadas sus coordenadas 
    // de longitud y latitud)
    // Calcula la distancia (Más corta) en km entre dos puntos geográficos
    const haversine = `
      (2 * 6371 * ASIN(
        SQRT(
          POWER(SIN(RADIANS(v.lat - $1) / 2), 2) +
          COS(RADIANS($1)) * COS(RADIANS(v.lat)) *
          POWER(SIN(RADIANS(v.lng - $2) / 2), 2)
        )
      ))
    `;

    // Parámetros base: lat, lng, radio
    const params = [lat, lng, radiusKm];

    // Condiciones base: que tenga coords y esté dentro del radio
    let conditions = [
      'v.lat IS NOT NULL',
      'v.lng IS NOT NULL',
      `${haversine} <= $3`
    ];

    // Filtro opcional por rating mínimo
    if (ratingMin !== null) {
      params.push(Number(ratingMin));
      conditions.push(`v.rating >= $${params.length}`);
    }

    // Filtro opcional por servicio
    if (servicio !== null) {
      params.push(servicio.toLowerCase());
      conditions.push(`
        EXISTS (
          SELECT 1 FROM servicios s
          INNER JOIN veterinaria_servicios vs ON s.id_servicio = vs.id_servicio
          WHERE vs.id_veterinaria = v.id_veterinaria
          AND LOWER(s.nombre) = $${params.length}
        )
      `);
    }

    const where = `WHERE ${conditions.join(' AND ')}`;

    const query = `
      SELECT
        v.*,
        ROUND((${haversine})::numeric, 2) AS distancia_km
      FROM veterinarias v
      ${where}
      ORDER BY distancia_km ASC
    `;

    const veterinarias = await db.all(query, params);

    // Cargar servicios de cada veterinaria
    for (let vet of veterinarias) {
      vet.servicios = await this.getServiciosByVeterinaria(vet.id_veterinaria);
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

  async getAllServicios() {
    return await db.all('SELECT * FROM servicios ORDER BY id_servicio ASC');
  }

  async getServicioById(id) {
    return await db.get('SELECT * FROM servicios WHERE id_servicio = $1', [id]);
  }

  async getServiciosByVeterinaria(id_veterinaria) {
    return await db.all(
      `SELECT s.* FROM servicios s
       INNER JOIN veterinaria_servicios vs ON s.id_servicio = vs.id_servicio
       WHERE vs.id_veterinaria = $1`,
      [id_veterinaria]
    );
  }

  async createServicio(nombre, descripcion = null) {
    const result = await db.get(
      'INSERT INTO servicios (nombre, descripcion) VALUES ($1, $2) RETURNING id_servicio',
      [nombre, descripcion]
    );
    return await this.getServicioById(result.id_servicio);
  }

  async addServicioToVeterinaria(id_veterinaria, id_servicio) {
    await db.run(
      'INSERT INTO veterinaria_servicios (id_veterinaria, id_servicio) VALUES ($1, $2)',
      [id_veterinaria, id_servicio]
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
