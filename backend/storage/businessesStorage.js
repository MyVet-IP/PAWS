const db = require('../db');

module.exports = {
    // ─── READ ─────────────────────────────────────────────────────────────────

    async getAll({ type = null, zone = null } = {}) {
        const conditions = ['b.status = $1'];
        const values = ['active'];
        let i = 2;

        if (type) { conditions.push(`b.business_type = $${i++}`); values.push(type); }
        if (zone) { conditions.push(`b.zone ILIKE $${i++}`); values.push(`%${zone}%`); }

        const businesses = await db.all(
            `SELECT b.*, c.is_24h, c.rating, c.service_type
            FROM businesses b
            LEFT JOIN clinics c ON c.business_id = b.business_id
            WHERE ${conditions.join(' AND ')}
            ORDER BY b.name ASC`,
            values
        );

        for (const biz of businesses) {
            biz.specialties = await this._getSpecialties(biz.business_id, biz.business_type);
            biz.schedule = await this.getSchedule(biz.business_id);
        }

        return businesses;
    },

    async getById(business_id) {
        const biz = await db.get(
            `SELECT b.*, c.is_24h, c.rating, c.service_type, c.clinic_id
            FROM businesses b
            LEFT JOIN clinics c ON c.business_id = b.business_id
            WHERE b.business_id = $1`,
            [business_id]
        );
        if (!biz) return null;

        biz.specialties = await this._getSpecialties(biz.business_id, biz.business_type);
        biz.animal_types = await this._getAnimalTypes(biz.business_id, biz.business_type);
        biz.schedule = await this.getSchedule(biz.business_id);
        return biz;
    },

    async getByUser(user_id) {
        return db.get(
            `SELECT * FROM businesses WHERE user_id = $1`,
            [user_id]
        );
    },

    // ─── SCHEDULE ─────────────────────────────────────────────────────────────

    async getSchedule(business_id) {
        return db.all(
            `SELECT * FROM schedules WHERE business_id = $1 ORDER BY schedule_id ASC`,
            [business_id]
        );
    },

    // ─── SPECIALTIES catalog ──────────────────────────────────────────────────

    async getAllSpecialties() {
        return db.all(`SELECT * FROM specialties ORDER BY name ASC`);
    },

    async getAllAnimalTypes() {
        return db.all(`SELECT * FROM animal_types ORDER BY name ASC`);
    },

    // ─── CREATE ───────────────────────────────────────────────────────────────

    async create(data) {
        const {
            user_id, business_type, name, address, phone, whatsapp,
            email, zone, latitude, longitude, image_url, nit
        } = data;

        const result = await db.get(
            `INSERT INTO businesses
                (user_id, business_type, name, address, phone, whatsapp, email,
                zone, latitude, longitude, image_url, nit, nit_verified)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
            RETURNING business_id`,
            [user_id, business_type, name, address, phone, whatsapp, email,
                zone, latitude, longitude, image_url,
                nit || null,
                nit ? 'pending' : null]
        );

        // Crear detalle según tipo
        const bid = result.business_id;
        if (business_type === 'clinic') await db.run(`INSERT INTO clinics (business_id) VALUES ($1)`, [bid]);
        if (business_type === 'vet') await db.run(`INSERT INTO vets (business_id) VALUES ($1)`, [bid]);
        if (business_type === 'daycare') await db.run(`INSERT INTO daycares (business_id) VALUES ($1)`, [bid]);
        if (business_type === 'petshop') await db.run(`INSERT INTO petshops (business_id) VALUES ($1)`, [bid]);
        if (business_type === 'shelter') await db.run(`INSERT INTO shelters (business_id) VALUES ($1)`, [bid]);
        if (business_type === 'dog_walker') await db.run(`INSERT INTO dog_walkers (business_id) VALUES ($1)`, [bid]);

        return this.getById(bid);
    },

    // ─── UPDATE ───────────────────────────────────────────────────────────────

    async update(business_id, data) {
        const allowed = ['name', 'address', 'phone', 'whatsapp', 'email',
            'zone', 'latitude', 'longitude', 'image_url', 'status'];
        const fields = [];
        const values = [];
        let i = 1;

        for (const key of allowed) {
            if (data[key] !== undefined) {
                fields.push(`${key} = $${i++}`);
                values.push(data[key]);
            }
        }

        if (fields.length === 0) return this.getById(business_id);

        values.push(business_id);
        await db.run(
            `UPDATE businesses SET ${fields.join(', ')} WHERE business_id = $${i}`,
            values
        );
        return this.getById(business_id);
    },

    // ─── PRIVADOS ─────────────────────────────────────────────────────────────

    async _getSpecialties(business_id, type) {
        if (type === 'clinic') {
            return db.all(
                `SELECT s.specialty_id, s.name
                FROM clinic_specialties cs
                INNER JOIN specialties s ON s.specialty_id = cs.specialty_id
                INNER JOIN clinics c ON c.clinic_id = cs.clinic_id
                WHERE c.business_id = $1`,
                [business_id]
            );
        }
        if (type === 'vet') {
            return db.all(
                `SELECT s.specialty_id, s.name
                FROM vet_specialties vs
                INNER JOIN specialties s ON s.specialty_id = vs.specialty_id
                INNER JOIN vets v ON v.vet_id = vs.vet_id
                WHERE v.business_id = $1`,
                [business_id]
            );
        }
        return [];
    },

    async _getAnimalTypes(business_id, type) {
        if (type === 'clinic') {
            return db.all(
                `SELECT at.animal_type_id, at.name
                FROM clinic_animal_types cat
                INNER JOIN animal_types at ON at.animal_type_id = cat.animal_type_id
                INNER JOIN clinics c ON c.clinic_id = cat.clinic_id
                WHERE c.business_id = $1`,
                [business_id]
            );
        }
        if (type === 'vet') {
            return db.all(
                `SELECT at.animal_type_id, at.name
                FROM vet_animal_types vat
                INNER JOIN animal_types at ON at.animal_type_id = vat.animal_type_id
                INNER JOIN vets v ON v.vet_id = vat.vet_id
                WHERE v.business_id = $1`,
                [business_id]
            );
        }
        return [];
    }
};