const db = require('../db');

module.exports = {
    // ─── READ ────────────────────────────────────────────────────────────────

    async getAll() {
        return db.all(
            `SELECT u.user_id, u.name, u.email, u.phone, u.role, u.created_at,
                    COUNT(p.pet_id) AS pet_count
            FROM users u
            LEFT JOIN pets p ON p.user_id = u.user_id
            GROUP BY u.user_id, u.name, u.email, u.phone, u.role, u.created_at
            ORDER BY u.user_id ASC`
        );
    },

    async getById(user_id) {
        return db.get(
            `SELECT user_id, name, email, phone, role, created_at
            FROM users WHERE user_id = $1`,
            [user_id]
        );
    },

    async getByEmail(email) {
        // incluye password para validar login
        return db.get(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );
    },

    // ─── CREATE ───────────────────────────────────────────────────────────────

    async create({ name, email, password, phone = null, role = 'user' }) {
        const result = await db.get(
            `INSERT INTO users (name, email, password, phone, role)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING user_id`,
            [name, email, password, phone, role]
        );
        return this.getById(result.user_id);
    },

    // ─── UPDATE ───────────────────────────────────────────────────────────────

    async update(user_id, data) {
        const allowed = ['name', 'email', 'phone'];
        const fields = [];
        const values = [];
        let i = 1;

        for (const key of allowed) {
            if (data[key] !== undefined) {
                fields.push(`${key} = $${i++}`);
                values.push(data[key]);
            }
        }

        if (fields.length === 0) return this.getById(user_id);

        values.push(user_id);
        await db.run(
            `UPDATE users SET ${fields.join(', ')} WHERE user_id = $${i}`,
            values
        );
        return this.getById(user_id);
    },

    // ─── DELETE 

    async remove(user_id) {
        await db.run(`DELETE FROM users WHERE user_id = $1`, [user_id]);
    },

    // ─── DASHBOARD 

    async getDashboard(user_id) {
        const user = await this.getById(user_id);
        if (!user) return null;

        const pets = await db.all(
            `SELECT p.pet_id, p.name, p.breed, p.birth_date, p.weight_kg, p.created_at,
                    at.name AS species_name
            FROM pets p
            LEFT JOIN animal_types at ON at.animal_type_id = p.animal_type_id
            WHERE p.user_id = $1 ORDER BY p.pet_id ASC`,
            [user_id]
        );

        for (const pet of pets) {
            pet.medical_records = await db.all(
                `SELECT mr.record_id, mr.visit_date, mr.visit_type, mr.reason,
                        mr.diagnosis, mr.treatment, mr.notes, mr.next_visit_date,
                        b.name AS clinic_name
                FROM medical_records mr
                LEFT JOIN clinics c ON c.clinic_id = mr.clinic_id
                LEFT JOIN businesses b ON b.business_id = c.business_id
                WHERE mr.pet_id = $1
                ORDER BY mr.visit_date DESC`,
                [pet.pet_id]
            );
        }

        return { user, pets };
    }
};