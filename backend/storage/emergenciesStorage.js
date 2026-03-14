const db = require('../db');

module.exports = {
    // ─── EMERGENCIES ──────────────────────────────────────────────────────────

    async getAllEmergencies() {
        return db.all(
            `SELECT e.*,
                    p.name AS pet_name,
                    b.name AS business_name,
                    b.phone AS business_phone,
                    b.whatsapp AS business_whatsapp
            FROM emergencies e
            INNER JOIN pets p        ON p.pet_id      = e.pet_id
            INNER JOIN businesses b  ON b.business_id = e.business_id
            ORDER BY e.created_at DESC`
        );
    },

    async getEmergencyById(emergency_id) {
        return db.get(
            `SELECT e.*,
                    p.name AS pet_name,
                    b.name AS business_name,
                    b.phone AS business_phone,
                    b.whatsapp AS business_whatsapp
            FROM emergencies e
            INNER JOIN pets p        ON p.pet_id      = e.pet_id
            INNER JOIN businesses b  ON b.business_id = e.business_id
            WHERE e.emergency_id = $1`,
            [emergency_id]
        );
    },

    async createEmergency({ pet_id, business_id, description }) {
        const result = await db.get(
            `INSERT INTO emergencies (pet_id, business_id, description)
            VALUES ($1, $2, $3)
            RETURNING emergency_id`,
            [pet_id, business_id, description]
        );
        return this.getEmergencyById(result.emergency_id);
    },

    async updateEmergencyStatus(emergency_id, status) {
        const resolved_at = status === 'resolved' ? new Date() : null;
        await db.run(
            `UPDATE emergencies SET status = $1, resolved_at = $2
            WHERE emergency_id = $3`,
            [status, resolved_at, emergency_id]
        );
        return this.getEmergencyById(emergency_id);
    },

    // ─── EMERGENCY MESSAGES ───────────────────────────────────────────────────

    async getAllMessages() {
        return db.all(
            `SELECT em.*,
                    b.name     AS business_name,
                    b.whatsapp AS business_whatsapp
            FROM emergency_messages em
            INNER JOIN businesses b ON b.business_id = em.business_id
            ORDER BY em.created_at DESC`
        );
    },

    async getMessageById(message_id) {
        return db.get(
            `SELECT em.*,
                    b.name     AS business_name,
                    b.whatsapp AS business_whatsapp,
                    b.phone    AS business_phone
            FROM emergency_messages em
            INNER JOIN businesses b ON b.business_id = em.business_id
            WHERE em.message_id = $1`,
            [message_id]
        );
    },

    async createMessage({
        business_id, emergency_id = null,
        message, contact_name, contact_phone = null,
        channel = 'whatsapp'
    }) {
        const result = await db.get(
            `INSERT INTO emergency_messages
                (business_id, emergency_id, message, contact_name, contact_phone, channel)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING message_id`,
            [business_id, emergency_id, message, contact_name, contact_phone, channel]
        );
        return this.getMessageById(result.message_id);
    }
};