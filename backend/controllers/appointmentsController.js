const appointmentsStorage = require('../storage/appointmentsStorage');

const VALID_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'];

exports.getAll = async (req, res, next) => {
    try {
        const { status } = req.query;
        const appointments = await appointmentsStorage.getAll({ status });
        res.json(appointments);
    } catch (err) {
        next(err);
    }
};

exports.getByUser = async (req, res, next) => {
    try {
        const { status } = req.query;
        const appointments = await appointmentsStorage.getByUser(req.params.id, { status });
        res.json(appointments);
    } catch (err) {
        next(err);
    }
};

exports.getByBusiness = async (req, res, next) => {
    try {
        const { status } = req.query;
        const appointments = await appointmentsStorage.getByBusiness(req.params.id, { status });
        res.json(appointments);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { user_id, business_id, pet_id, date, time, notes, status } = req.body;
        if (!user_id || !business_id || !pet_id || !date || !time) {
            return res.status(400).json({ error: 'user_id, business_id, pet_id, date y time son requeridos' });
        }
        const appointment = await appointmentsStorage.create({ user_id, business_id, pet_id, date, time, notes, status });
        res.status(201).json(appointment);
    } catch (err) {
        next(err);
    }
};

exports.updateStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        if (!status || !VALID_STATUSES.includes(status)) {
            return res.status(400).json({ error: `status must be one of: ${VALID_STATUSES.join(', ')}` });
        }
        const appointment = await appointmentsStorage.updateStatus(req.params.id, status);
        res.json(appointment);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await appointmentsStorage.remove(req.params.id);
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
};