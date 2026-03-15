const daycaresStorage = require('../storage/daycaresStorage');

exports.getSlots = async (req, res, next) => {
    try {
        const slots = await daycaresStorage.getSlots(req.params.id);
        res.json(slots);
    } catch (err) { next(err); }
};

exports.createBooking = async (req, res, next) => {
    try {
        const { slot_id, pet_id, user_id, booking_date, notes } = req.body;
        if (!slot_id || !pet_id || !user_id || !booking_date)
            return res.status(400).json({ error: 'slot_id, pet_id, user_id y booking_date son requeridos' });
        const booking = await daycaresStorage.createBooking({ slot_id, pet_id, user_id, booking_date, notes });
        res.status(201).json(booking);
    } catch (err) { next(err); }
};

exports.getBookingsByUser = async (req, res, next) => {
    try {
        const { user_id } = req.query;
        if (!user_id)
            return res.status(400).json({ error: 'user_id es requerido' });
        const bookings = await daycaresStorage.getBookingsByUser(user_id);
        res.json(bookings);
    } catch (err) { next(err); }
};