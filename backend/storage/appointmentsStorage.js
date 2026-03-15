const db = require('../db');

module.exports = {
    // ─── READ ─────────────────────────────────────────────────────────────────

    async getAll({ status = null } = {}) {
        const conditions = [];
        const values = [];
        let i = 1;

        if (status) { conditions.push(`a.status = $${i++}`); values.push(status); }

        const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

        return db.all(
            `SELECT a.appointment_id, a.date, a.time, a.status, a.notes, a.created_at,
                    p.name AS pet_name,
                    u.name AS owner_name,
                    b.name AS business_name
            FROM appointments a
            INNER JOIN pets p ON p.pet_id = a.pet_id
            INNER JOIN users u ON u.user_id = a.user_id
            INNER JOIN businesses b ON b.business_id = a.business_id
            ${where}
            ORDER BY a.date DESC, a.time DESC`,
            values
        );
    },

    // ─── UPDATE ───────────────────────────────────────────────────────────────

    async updateStatus(appointment_id, status) {
        await db.run(
            `UPDATE appointments SET status = $1 WHERE appointment_id = $2`,
            [status, appointment_id]
        );
        return db.get(
            `SELECT a.appointment_id, a.date, a.time, a.status, a.notes,
                    p.name AS pet_name, u.name AS owner_name, b.name AS business_name
            FROM appointments a
            INNER JOIN pets p ON p.pet_id = a.pet_id
            INNER JOIN users u ON u.user_id = a.user_id
            INNER JOIN businesses b ON b.business_id = a.business_id
            WHERE a.appointment_id = $1`,
            [appointment_id]
        );
    },

    // ─── DELETE ───────────────────────────────────────────────────────────────

    async remove(appointment_id) {
        await db.run(`DELETE FROM appointments WHERE appointment_id = $1`, [appointment_id]);
    }
};
