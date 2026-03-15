const db = require('../db');

module.exports = {
    async upsertSchedule(business_id, days) {
        // days = [{ day_of_week, open_time, close_time, is_open }, ...]
        for (const day of days) {
            const { day_of_week, open_time, close_time, is_open } = day;
            await db.run(
                `INSERT INTO schedules (business_id, day_of_week, open_time, close_time, is_open)
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (business_id, day_of_week)
                DO UPDATE SET open_time = $3, close_time = $4, is_open = $5`,
                [business_id, day_of_week, open_time || null, close_time || null, is_open ?? true]
            );
        }
        return this.getSchedule(business_id);
    },

    async addSpecialty(business_id, specialty_id) {
        const biz = await db.get(
            `SELECT business_id, business_type FROM businesses WHERE business_id = $1`,
            [business_id]
        );
        if (!biz) return null;

        if (biz.business_type === 'clinic') {
            const clinic = await db.get(
                `SELECT clinic_id FROM clinics WHERE business_id = $1`, [business_id]
            );
            if (!clinic) return null;
            await db.run(
                `INSERT INTO clinic_specialties (clinic_id, specialty_id)
                VALUES ($1, $2) ON CONFLICT DO NOTHING`,
                [clinic.clinic_id, specialty_id]
            );
        } else if (biz.business_type === 'vet') {
            const vet = await db.get(
                `SELECT vet_id FROM vets WHERE business_id = $1`, [business_id]
            );
            if (!vet) return null;
            await db.run(
                `INSERT INTO vet_specialties (vet_id, specialty_id)
                VALUES ($1, $2) ON CONFLICT DO NOTHING`,
                [vet.vet_id, specialty_id]
            );
        }
        return this._getSpecialties(business_id, biz.business_type);
    },

    async removeSpecialty(business_id, specialty_id) {
        const biz = await db.get(
            `SELECT business_id, business_type FROM businesses WHERE business_id = $1`,
            [business_id]
        );
        if (!biz) return null;

        if (biz.business_type === 'clinic') {
            const clinic = await db.get(
                `SELECT clinic_id FROM clinics WHERE business_id = $1`, [business_id]
            );
            if (clinic) {
                await db.run(
                    `DELETE FROM clinic_specialties WHERE clinic_id = $1 AND specialty_id = $2`,
                    [clinic.clinic_id, specialty_id]
                );
            }
        } else if (biz.business_type === 'vet') {
            const vet = await db.get(
                `SELECT vet_id FROM vets WHERE business_id = $1`, [business_id]
            );
            if (vet) {
                await db.run(
                    `DELETE FROM vet_specialties WHERE vet_id = $1 AND specialty_id = $2`,
                    [vet.vet_id, specialty_id]
                );
            }
        }
        return this._getSpecialties(business_id, biz.business_type);
    },

    // ─── READ ─────────────────────────────────────────────────────────────────

    async getAll({ type = null, zone = null, city = null } = {}) {
        const conditions = ['b.status = $1'];
        const values = ['active'];
        let i = 2;

        if (type) { conditions.push(`b.business_type = $${i++}`); values.push(type); }
        if (zone) { conditions.push(`b.zone ILIKE $${i++}`); values.push(`%${zone}%`); }
        if (city) { conditions.push(`b.city ILIKE $${i++}`); values.push(`%${city}%`); }

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

    // ─── DELETE ───────────────────────────────────────────────────────────────

    async remove(business_id) {
        await db.run(`DELETE FROM businesses WHERE business_id = $1`, [business_id]);
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