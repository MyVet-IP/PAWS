const db = require('../db');

module.exports = {

    async getAll() {
        return db.all(
            `SELECT s.shelter_id, s.business_id,
                    b.name, b.address, b.phone, b.whatsapp,
                    b.email, b.zone, b.image_url, b.status,
                    COUNT(sp.shelter_pet_id) FILTER (WHERE sp.status = 'available') AS available_pets
             FROM shelters s
             INNER JOIN businesses b ON b.business_id = s.business_id
             LEFT JOIN shelter_pets sp ON sp.shelter_id = s.shelter_id
             WHERE b.status = 'active'
             GROUP BY s.shelter_id, s.business_id, b.name, b.address,
                      b.phone, b.whatsapp, b.email, b.zone, b.image_url, b.status
             ORDER BY s.shelter_id ASC`
        );
    },

    async getPets(shelter_id) {
        return db.all(
            `SELECT * FROM shelter_pets
             WHERE shelter_id = $1
             ORDER BY created_at DESC`,
            [shelter_id]
        );
    },

    async createAdoption({ shelter_id, shelter_pet_id, user_id, pet_id, notes }) {
        const result = await db.get(
            `INSERT INTO adoptions (shelter_id, shelter_pet_id, user_id, pet_id, notes)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING adoption_id`,
            [shelter_id, shelter_pet_id, user_id, pet_id, notes]
        );
        // Marcar mascota como adoptada
        await db.run(
            `UPDATE shelter_pets SET status = 'adopted' WHERE shelter_pet_id = $1`,
            [shelter_pet_id]
        );
        return db.get(
            `SELECT a.*, sp.name AS pet_name, u.name AS adopter_name
             FROM adoptions a
             INNER JOIN shelter_pets sp ON sp.shelter_pet_id = a.shelter_pet_id
             INNER JOIN users u ON u.user_id = a.user_id
             WHERE a.adoption_id = $1`,
            [result.adoption_id]
        );
    }
};