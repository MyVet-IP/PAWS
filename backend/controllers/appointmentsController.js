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
