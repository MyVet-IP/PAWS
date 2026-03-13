const db = require('../db');

module.exports = {
    // ─── READ ─────────────────────────────────────────────────────────────────

    async getAll() {
        return db.all(
            `SELECT mr.*,
                    p.name  AS pet_name,
                    u.name  AS owner_name,
                    b.name  AS clinic_name
            FROM medical_records mr
            INNER JOIN pets p       ON p.pet_id   = mr.pet_id
            INNER JOIN users u      ON u.user_id  = mr.user_id
            LEFT  JOIN clinics c    ON c.clinic_id = mr.clinic_id
            LEFT  JOIN businesses b ON b.business_id = c.business_id
            ORDER BY mr.visit_date DESC`
        );
    },

    async getById(record_id) {
        return db.get(
            `SELECT mr.*,
                    p.name  AS pet_name,
                    u.name  AS owner_name,
                    b.name  AS clinic_name
            FROM medical_records mr
            INNER JOIN pets p       ON p.pet_id   = mr.pet_id
            INNER JOIN users u      ON u.user_id  = mr.user_id
            LEFT  JOIN clinics c    ON c.clinic_id = mr.clinic_id
            LEFT  JOIN businesses b ON b.business_id = c.business_id
            WHERE mr.record_id = $1`,
            [record_id]
        );
    },

    async getByPet(pet_id) {
        return db.all(
            `SELECT mr.*,
                    b.name AS clinic_name
            FROM medical_records mr
            LEFT  JOIN clinics c    ON c.clinic_id = mr.clinic_id
            LEFT  JOIN businesses b ON b.business_id = c.business_id
            WHERE mr.pet_id = $1
            ORDER BY mr.visit_date DESC`,
            [pet_id]
        );
    },

    async getByUser(user_id) {
        return db.all(
            `SELECT mr.*,
                    p.name AS pet_name,
                    b.name AS clinic_name
            FROM medical_records mr
            INNER JOIN pets p       ON p.pet_id   = mr.pet_id
            LEFT  JOIN clinics c    ON c.clinic_id = mr.clinic_id
            LEFT  JOIN businesses b ON b.business_id = c.business_id
            WHERE mr.user_id = $1
            ORDER BY mr.visit_date DESC`,
            [user_id]
        );
    },

    // ─── CREATE ───────────────────────────────────────────────────────────────

    async create({
        pet_id, user_id, clinic_id = null, veterinarian = null,
        visit_date = null, visit_type, reason = null,
        diagnosis = null, treatment = null, notes = null,
        next_visit_date = null, follow_up_notes = null,
        file_url = null, file_original_name = null,
        file_mime_type = null, file_size_bytes = null
    }) {
        const result = await db.get(
            `INSERT INTO medical_records
                (pet_id, user_id, clinic_id, veterinarian, visit_date, visit_type,
                reason, diagnosis, treatment, notes, next_visit_date, follow_up_notes,
                file_url, file_original_name, file_mime_type, file_size_bytes)
            VALUES ($1,$2,$3,$4,
                    COALESCE($5, CURRENT_TIMESTAMP),
                    $6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
            RETURNING record_id`,
            [pet_id, user_id, clinic_id, veterinarian, visit_date, visit_type,
                reason, diagnosis, treatment, notes, next_visit_date, follow_up_notes,
                file_url, file_original_name, file_mime_type, file_size_bytes]
        );
        return this.getById(result.record_id);
    },

    // ─── UPDATE ───────────────────────────────────────────────────────────────

    async update(record_id, data) {
        const allowed = [
            'veterinarian', 'visit_date', 'visit_type', 'reason',
            'diagnosis', 'treatment', 'notes', 'next_visit_date', 'follow_up_notes'
        ];
        const fields = [];
        const values = [];
        let i = 1;

        for (const key of allowed) {
            if (data[key] !== undefined) {
                fields.push(`${key} = $${i++}`);
                values.push(data[key]);
            }
        }

        if (fields.length === 0) return this.getById(record_id);

        values.push(record_id);
        await db.run(
            `UPDATE medical_records SET ${fields.join(', ')} WHERE record_id = $${i}`,
            values
        );
        return this.getById(record_id);
    },

    // ─── DELETE ───────────────────────────────────────────────────────────────

    async remove(record_id) {
        await db.run(`DELETE FROM medical_records WHERE record_id = $1`, [record_id]);
    }
};