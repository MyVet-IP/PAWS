const db = require('../db');

module.exports = {
    async getAllVeterinarias() {
        const vets = await db.all('SELECT * FROM veterinarias ORDER BY id_veterinaria ASC');
        for (const vet of vets) {
            vet.specialties = await this.getSpecialtiesByVeterinaria(vet.id_veterinaria);
        }
        return vets;
    },

    async getVeterinariaById(id) {
        const vet = await db.get('SELECT * FROM veterinarias WHERE id_veterinaria = $1', [id]);
        if (vet) vet.specialties = await this.getSpecialtiesByVeterinaria(id);
        return vet;
    },

    async getVeterinariasByLocation(location) {
        const vets = await db.all(
            'SELECT * FROM veterinarias WHERE direccion ILIKE $1 OR zone ILIKE $2',
            [`%${location}%`, `%${location}%`]
        );
        for (const vet of vets) {
            vet.specialties = await this.getSpecialtiesByVeterinaria(vet.id_veterinaria);
        }
        return vets;
    },

    async createVeterinaria(data) {
        const { nombre, direccion, telefono = null, whatsapp = null, estado = 'Activa', rating = 0, imagen = null, zone = null, service_type = 'public', is_24h = false, latitude = null, longitude = null } = data;
        const result = await db.get(
            `INSERT INTO veterinarias (nombre, direccion, telefono, whatsapp, estado, rating, imagen, zone, service_type, is_24h, latitude, longitude)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id_veterinaria`,
            [nombre, direccion, telefono, whatsapp, estado, rating, imagen, zone, service_type, is_24h, latitude, longitude]
        );
        return this.getVeterinariaById(result.id_veterinaria);
    },

    async getAllSpecialties() {
        return db.all('SELECT * FROM specialties ORDER BY name ASC');
    },

    async getSpecialtyById(id) {
        return db.get('SELECT * FROM specialties WHERE id_specialty = $1', [id]);
    },

    async getSpecialtiesByVeterinaria(id_veterinaria) {
        return db.all(
            `SELECT s.* FROM specialties s
              INNER JOIN vet_specialties vs ON s.id_specialty = vs.id_specialty
              WHERE vs.id_veterinaria = $1`,
            [id_veterinaria]
        );
    },

    async createSpecialty(name) {
        const result = await db.get(
            'INSERT INTO specialties (name) VALUES ($1) RETURNING id_specialty',
            [name]
        );
        return this.getSpecialtyById(result.id_specialty);
    },

    async addSpecialtyToVeterinaria(id_veterinaria, id_specialty) {
        await db.run(
            'INSERT INTO vet_specialties (id_veterinaria, id_specialty) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [id_veterinaria, id_specialty]
        );
        return { success: true };
    },

    async getAllAnimalTypes() {
        return db.all('SELECT * FROM animal_types ORDER BY name ASC');
    },

    async getAnimalTypesByVeterinaria(id_veterinaria) {
        return db.all(
            `SELECT at.* FROM animal_types at
              INNER JOIN vet_animal_types vat ON at.id_animal_type = vat.id_animal_type
              WHERE vat.id_veterinaria = $1`,
            [id_veterinaria]
        );
    },

    async addAnimalTypeToVeterinaria(id_veterinaria, id_animal_type) {
        await db.run(
            'INSERT INTO vet_animal_types (id_veterinaria, id_animal_type) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [id_veterinaria, id_animal_type]
        );
        return { success: true };
    },

    async getSchedulesByVeterinaria(id_veterinaria) {
        return db.all(
            'SELECT * FROM schedules WHERE id_veterinaria = $1 ORDER BY id_schedule ASC',
            [id_veterinaria]
        );
    },

    async setSchedule(id_veterinaria, day_of_week, open_time, close_time, is_open = true) {
        const existing = await db.get(
            'SELECT id_schedule FROM schedules WHERE id_veterinaria = $1 AND day_of_week = $2',
            [id_veterinaria, day_of_week]
        );
        if (existing) {
            await db.run(
                'UPDATE schedules SET open_time = $1, close_time = $2, is_open = $3 WHERE id_schedule = $4',
                [open_time, close_time, is_open, existing.id_schedule]
            );
        } else {
            await db.run(
                'INSERT INTO schedules (id_veterinaria, day_of_week, open_time, close_time, is_open) VALUES ($1, $2, $3, $4, $5)',
                [id_veterinaria, day_of_week, open_time, close_time, is_open]
            );
        }
        return this.getSchedulesByVeterinaria(id_veterinaria);
    }
};
