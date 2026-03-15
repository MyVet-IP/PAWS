const db = require('./storage/db');

class Storage {
  // Usuarios

  async getAllUsers() {
    return await db.all(
      'SELECT user_id, name, email, phone, role, created_at FROM users ORDER BY user_id ASC'
    );
  }

  async getUserById(id) {
    return await db.get(
      'SELECT user_id, name, email, phone, role, created_at FROM users WHERE user_id = $1',
      [id]
    );
  }

  async getUserByEmail(email) {
    return await db.get(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
  }

  async createUser(name, email, password, phone = null, role = 'user') {
    const result = await db.get(
      `INSERT INTO users (name, email, password, phone, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING user_id`,
      [name, email, password, phone, role]
    );
    return await this.getUserById(result.user_id);
  }

  async updateUser(id, data) {
    const fields = [];
    const values = [];
    let p = 1;

    if (data.name !== undefined)  { fields.push(`name = $${p++}`);  values.push(data.name); }
    if (data.email !== undefined) { fields.push(`email = $${p++}`); values.push(data.email); }
    if (data.phone !== undefined) { fields.push(`phone = $${p++}`); values.push(data.phone); }
    if (data.role !== undefined)  { fields.push(`role = $${p++}`);  values.push(data.role); }

    if (fields.length === 0) return await this.getUserById(id);

    values.push(id);
    await db.run(
      `UPDATE users SET ${fields.join(', ')} WHERE user_id = $${p}`,
      values
    );
    return await this.getUserById(id);
  }

  // Negocios

  async getBusinessById(id) {
    return await db.get('SELECT * FROM businesses WHERE business_id = $1', [id]);
  }

  // Clínicas

  async getAllClinics() {
    const clinics = await db.all(`
      SELECT c.clinic_id, c.service_type, c.is_24h, c.rating,
             b.business_id, b.name, b.address, b.phone, b.whatsapp,
             b.zone, b.latitude, b.longitude, b.image_url, b.status
      FROM clinics c
      JOIN businesses b ON b.business_id = c.business_id
      ORDER BY b.name ASC
    `);

    for (const clinic of clinics) {
      clinic.specialties = await this.getSpecialtiesByClinic(clinic.clinic_id);
    }

    return clinics;
  }

  async getClinicById(id) {
    const clinic = await db.get(`
      SELECT c.clinic_id, c.service_type, c.is_24h, c.rating,
             b.business_id, b.name, b.address, b.phone, b.whatsapp,
             b.zone, b.latitude, b.longitude, b.image_url, b.status
      FROM clinics c
      JOIN businesses b ON b.business_id = c.business_id
      WHERE c.clinic_id = $1
    `, [id]);

    if (clinic) {
      clinic.specialties = await this.getSpecialtiesByClinic(id);
    }

    return clinic;
  }

  async getClinicsByLocation(location) {
    const clinics = await db.all(`
      SELECT c.clinic_id, c.service_type, c.is_24h, c.rating,
             b.business_id, b.name, b.address, b.phone, b.whatsapp,
             b.zone, b.latitude, b.longitude, b.image_url, b.status
      FROM clinics c
      JOIN businesses b ON b.business_id = c.business_id
      WHERE b.address ILIKE $1 OR b.zone ILIKE $2
      ORDER BY b.name ASC
    `, [`%${location}%`, `%${location}%`]);

    for (const clinic of clinics) {
      clinic.specialties = await this.getSpecialtiesByClinic(clinic.clinic_id);
    }

    return clinics;
  }

  async createClinic(data) {
    const {
      user_id,
      name,
      address,
      phone,
      whatsapp,
      zone,
      latitude,
      longitude,
      image_url,
      service_type,
      is_24h
    } = data;

    const business = await db.get(
      `INSERT INTO businesses (
        user_id, business_type, name, address, phone, whatsapp,
        zone, latitude, longitude, image_url, status
      )
      VALUES ($1, 'clinic', $2, $3, $4, $5, $6, $7, $8, $9, 'active')
      RETURNING business_id`,
      [
        user_id,
        name,
        address,
        phone || null,
        whatsapp || null,
        zone || null,
        latitude || null,
        longitude || null,
        image_url || null
      ]
    );

    const clinic = await db.get(
      `INSERT INTO clinics (business_id, service_type, is_24h, rating)
       VALUES ($1, $2, $3, 0)
       RETURNING clinic_id`,
      [business.business_id, service_type || 'public', is_24h || false]
    );

    return await this.getClinicById(clinic.clinic_id);
  }

  // Especialidades

  async getAllSpecialties() {
    return await db.all('SELECT * FROM specialties ORDER BY specialty_id ASC');
  }

  async createSpecialty(name) {
    const result = await db.get(
      'INSERT INTO specialties (name) VALUES ($1) RETURNING specialty_id',
      [name]
    );
    return await db.get(
      'SELECT * FROM specialties WHERE specialty_id = $1',
      [result.specialty_id]
    );
  }

  async getSpecialtiesByClinic(clinic_id) {
    return await db.all(
      `SELECT s.specialty_id, s.name
       FROM specialties s
       JOIN clinic_specialties cs ON s.specialty_id = cs.specialty_id
       WHERE cs.clinic_id = $1`,
      [clinic_id]
    );
  }

  async addSpecialtyToClinic(clinic_id, specialty_id) {
    await db.run(
      'INSERT INTO clinic_specialties (clinic_id, specialty_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [clinic_id, specialty_id]
    );
    return { success: true };
  }

  // Tipos de animal

  async getAllAnimalTypes() {
    return await db.all('SELECT * FROM animal_types ORDER BY animal_type_id ASC');
  }

  // Mascotas

  async getAllPets() {
    return await db.all(
      `SELECT p.pet_id, p.user_id, p.name, p.animal_type_id, at.name AS animal_type_name,
              p.breed, p.birth_date, p.weight_kg, p.created_at, u.name AS owner_name
       FROM pets p
       JOIN users u ON u.user_id = p.user_id
       JOIN animal_types at ON at.animal_type_id = p.animal_type_id
       ORDER BY p.pet_id ASC`
    );
  }

  async getPetById(id) {
    return await db.get(
      `SELECT p.pet_id, p.user_id, p.name, p.animal_type_id, at.name AS animal_type_name,
              p.breed, p.birth_date, p.weight_kg, p.created_at,
              u.name AS owner_name, u.email AS owner_email, u.phone AS owner_phone
       FROM pets p
       JOIN users u ON u.user_id = p.user_id
       JOIN animal_types at ON at.animal_type_id = p.animal_type_id
       WHERE p.pet_id = $1`,
      [id]
    );
  }

  async getPetsByUser(user_id) {
    return await db.all(
      `SELECT p.pet_id, p.user_id, p.name, p.animal_type_id, at.name AS animal_type_name,
              p.breed, p.birth_date, p.weight_kg, p.created_at
       FROM pets p
       JOIN animal_types at ON at.animal_type_id = p.animal_type_id
       WHERE p.user_id = $1
       ORDER BY p.pet_id ASC`,
      [user_id]
    );
  }

  async createPet(data) {
    const { name, animal_type_id, breed, birth_date, weight_kg, user_id } = data;
    const result = await db.get(
      `INSERT INTO pets (name, animal_type_id, breed, birth_date, weight_kg, user_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING pet_id`,
      [name, animal_type_id, breed || null, birth_date || null, weight_kg || null, user_id]
    );
    return await this.getPetById(result.pet_id);
  }

  async updatePet(id, data) {
    const fields = [];
    const values = [];
    let p = 1;

    if (data.name !== undefined)            { fields.push(`name = $${p++}`); values.push(data.name); }
    if (data.animal_type_id !== undefined)  { fields.push(`animal_type_id = $${p++}`); values.push(data.animal_type_id); }
    if (data.breed !== undefined)           { fields.push(`breed = $${p++}`); values.push(data.breed); }
    if (data.birth_date !== undefined)      { fields.push(`birth_date = $${p++}`); values.push(data.birth_date); }
    if (data.weight_kg !== undefined)       { fields.push(`weight_kg = $${p++}`); values.push(data.weight_kg); }

    if (fields.length === 0) return await this.getPetById(id);

    values.push(id);
    await db.run(
      `UPDATE pets SET ${fields.join(', ')} WHERE pet_id = $${p}`,
      values
    );
    return await this.getPetById(id);
  }

  // Historial médico

  async getAllRecords() {
    return await db.all(
      `SELECT mr.*, p.name AS pet_name, b.name AS clinic_name
       FROM medical_records mr
       JOIN pets p ON p.pet_id = mr.pet_id
       JOIN clinics c ON c.clinic_id = mr.clinic_id
       JOIN businesses b ON b.business_id = c.business_id
       ORDER BY mr.visit_date DESC`
    );
  }

  async getRecordById(id) {
    return await db.get(
      `SELECT mr.*, p.name AS pet_name, b.name AS clinic_name
       FROM medical_records mr
       JOIN pets p ON p.pet_id = mr.pet_id
       JOIN clinics c ON c.clinic_id = mr.clinic_id
       JOIN businesses b ON b.business_id = c.business_id
       WHERE mr.record_id = $1`,
      [id]
    );
  }

  async getRecordsByPet(pet_id) {
    return await db.all(
      `SELECT mr.*, b.name AS clinic_name
       FROM medical_records mr
       JOIN clinics c ON c.clinic_id = mr.clinic_id
       JOIN businesses b ON b.business_id = c.business_id
       WHERE mr.pet_id = $1
       ORDER BY mr.visit_date DESC`,
      [pet_id]
    );
  }

  async createRecord(data) {
    const { pet_id, clinic_id, user_id, visit_type, reason, diagnosis, treatment, notes } = data;
    const result = await db.get(
      `INSERT INTO medical_records (pet_id, clinic_id, user_id, visit_type, reason, diagnosis, treatment, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING record_id`,
      [
        pet_id,
        clinic_id,
        user_id || null,
        visit_type || 'general',
        reason || null,
        diagnosis || null,
        treatment || null,
        notes || null
      ]
    );
    return await this.getRecordById(result.record_id);
  }

  // Emergencias

  async getAllEmergencies() {
    return await db.all(
      `SELECT e.*, p.name AS pet_name, b.name AS business_name
       FROM emergencies e
       JOIN pets p ON p.pet_id = e.pet_id
       JOIN businesses b ON b.business_id = e.business_id
       ORDER BY e.created_at DESC`
    );
  }

  async createEmergency(description, pet_id, business_id) {
    const result = await db.get(
      `INSERT INTO emergencies (description, pet_id, business_id)
       VALUES ($1, $2, $3)
       RETURNING emergency_id`,
      [description, pet_id, business_id]
    );

    return await db.get(
      `SELECT e.*, p.name AS pet_name, b.name AS business_name
       FROM emergencies e
       JOIN pets p ON p.pet_id = e.pet_id
       JOIN businesses b ON b.business_id = e.business_id
       WHERE e.emergency_id = $1`,
      [result.emergency_id]
    );
  }

  // Mensajes de emergencia

  async getAllEmergencyMessages() {
    return await db.all(
      `SELECT em.*, b.name AS business_name, b.whatsapp
       FROM emergency_messages em
       JOIN businesses b ON b.business_id = em.business_id
       ORDER BY em.created_at DESC`
    );
  }

  async createEmergencyMessage(data) {
    const { message, contact_name, contact_phone, business_id, emergency_id } = data;
    const row = await db.get(
      `INSERT INTO emergency_messages (message, contact_name, contact_phone, business_id, emergency_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING message_id`,
      [message, contact_name, contact_phone || null, business_id, emergency_id || null]
    );

    return await db.get(
      'SELECT * FROM emergency_messages WHERE message_id = $1',
      [row.message_id]
    );
  }

  // Dashboard del usuario

  async getUserDashboard(user_id) {
    const user = await this.getUserById(user_id);
    const pets = await this.getPetsByUser(user_id);

    for (const pet of pets) {
      pet.medical_records = await this.getRecordsByPet(pet.pet_id);
    }

    return { user, pets };
  }
}

module.exports = new Storage();