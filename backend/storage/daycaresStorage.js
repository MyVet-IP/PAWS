const db = require('../db');

module.exports = {

    async getSlots(daycare_id) {
        return db.all(
            `SELECT * FROM daycare_slots
             WHERE daycare_id = $1 AND is_active = TRUE
             ORDER BY day_of_week, start_time`,
            [daycare_id]
        );
    },

    async createBooking({ slot_id, pet_id, user_id, booking_date, notes }) {
        const result = await db.get(
            `INSERT INTO daycare_bookings (slot_id, pet_id, user_id, booking_date, notes)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING booking_id`,
            [slot_id, pet_id, user_id, booking_date, notes]
        );
        return db.get(
            `SELECT b.*, p.name AS pet_name, u.name AS owner_name,
                    ds.day_of_week, ds.start_time, ds.end_time
             FROM daycare_bookings b
             INNER JOIN pets p ON p.pet_id = b.pet_id
             INNER JOIN users u ON u.user_id = b.user_id
             INNER JOIN daycare_slots ds ON ds.slot_id = b.slot_id
             WHERE b.booking_id = $1`,
            [result.booking_id]
        );
    },

    async getBookingsByUser(user_id) {
        return db.all(
            `SELECT b.*, p.name AS pet_name,
                    ds.day_of_week, ds.start_time, ds.end_time,
                    bus.name AS daycare_name
             FROM daycare_bookings b
             INNER JOIN pets p ON p.pet_id = b.pet_id
             INNER JOIN daycare_slots ds ON ds.slot_id = b.slot_id
             INNER JOIN daycares d ON d.daycare_id = ds.daycare_id
             INNER JOIN businesses bus ON bus.business_id = d.business_id
             WHERE b.user_id = $1
             ORDER BY b.booking_date DESC`,
            [user_id]
        );
    }
};