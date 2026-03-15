const db = require('../db');

module.exports = {
    // ─── READ ─────────────────────────────────────────────────────────────────

    async getAll() {
        return db.all(
            `SELECT p.*, u.name AS owner_name, at.name AS species_name
            FROM pets p
            INNER JOIN users u ON u.user_id = p.user_id
            LEFT JOIN animal_types at ON at.animal_type_id = p.animal_type_id
            ORDER BY p.pet_id ASC`
        );
    },

    async getById(pet_id) {
        return db.get(
            `SELECT p.*, u.name AS owner_name
            FROM pets p
            INNER JOIN users u ON u.user_id = p.user_id
            WHERE p.pet_id = $1`,
            [pet_id]
        );
    },

    async getByUser(user_id) {
        return db.all(
            `SELECT * FROM pets WHERE user_id = $1 ORDER BY pet_id ASC`,
            [user_id]
        );
    },

    // ─── CREATE ───────────────────────────────────────────────────────────────

    async create({ name, animal_type_id, breed = null, birth_date = null, weight_kg = null, user_id }) {
        const result = await db.get(
            `INSERT INTO pets (name, animal_type_id, breed, birth_date, weight_kg, user_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING pet_id`,
            [name, animal_type_id, breed, birth_date, weight_kg, user_id]
        );
        return this.getById(result.pet_id);
    },

    // ─── UPDATE ───────────────────────────────────────────────────────────────

    async update(pet_id, data) {
        const allowed = ['name', 'animal_type_id', 'breed', 'birth_date', 'weight_kg'];
        const fields = [];
        const values = [];
        let i = 1;

        for (const key of allowed) {
            if (data[key] !== undefined) {
                fields.push(`${key} = $${i++}`);
                values.push(data[key]);
            }
        }

        if (fields.length === 0) return this.getById(pet_id);

        values.push(pet_id);
        await db.run(
            `UPDATE pets SET ${fields.join(', ')} WHERE pet_id = $${i}`,
            values
        );
        return this.getById(pet_id);
    },

    // ─── DELETE ───────────────────────────────────────────────────────────────

    async remove(pet_id) {
        await db.run(`DELETE FROM pets WHERE pet_id = $1`, [pet_id]);
    }
};