const appointmentsStorage = require('../storage/appointmentsStorage');

const VALID_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'];
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;

function isPositiveInteger(value) {
    return Number.isInteger(Number(value)) && Number(value) > 0;
}

function parseAppointmentDateTime(date, time) {
    if (!DATE_REGEX.test(date) || !TIME_REGEX.test(time)) return null;

    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes, seconds = '0'] = time.split(':');

    const appointmentDate = new Date(
        year,
        month - 1,
        day,
        Number(hours),
        Number(minutes),
        Number(seconds),
        0
    );

    // Reject invalid calendar values like 2026-02-31.
    if (
        appointmentDate.getFullYear() !== year ||
        appointmentDate.getMonth() !== month - 1 ||
        appointmentDate.getDate() !== day
    ) {
        return null;
    }

    return appointmentDate;
}

function ensureFutureAppointment(date, time) {
    const appointmentDate = parseAppointmentDateTime(date, time);
    if (!appointmentDate) {
        return { ok: false, error: 'Formato inválido. date debe ser YYYY-MM-DD y time HH:mm o HH:mm:ss' };
    }

    if (appointmentDate <= new Date()) {
        return { ok: false, error: 'La cita debe programarse en una fecha y hora futura' };
    }

    return { ok: true };
}

exports.getById = async (req, res, next) => {
    try {
        const appointment = await appointmentsStorage.getById(req.params.id);
        if (!appointment) return res.status(404).json({ error: 'Cita no encontrada' });
        res.json(appointment);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { date, time, status } = req.body;

        if (status !== undefined && !VALID_STATUSES.includes(status)) {
            return res.status(400).json({ error: `status must be one of: ${VALID_STATUSES.join(', ')}` });
        }

        const currentAppointment = await appointmentsStorage.getById(req.params.id);
        if (!currentAppointment) return res.status(404).json({ error: 'Cita no encontrada' });

        const effectiveDate = date !== undefined ? date : currentAppointment.date;
        const effectiveTime = time !== undefined ? time : currentAppointment.time;

        if (date !== undefined || time !== undefined) {
            const scheduleValidation = ensureFutureAppointment(effectiveDate, effectiveTime);
            if (!scheduleValidation.ok) {
                return res.status(400).json({ error: scheduleValidation.error });
            }
        }

        const updatedAppointment = await appointmentsStorage.update(req.params.id, req.body);
        res.json(updatedAppointment);
    } catch (err) {
        next(err);
    }
};

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

        if (!isPositiveInteger(user_id) || !isPositiveInteger(business_id) || !isPositiveInteger(pet_id)) {
            return res.status(400).json({ error: 'user_id, business_id y pet_id deben ser enteros positivos' });
        }

        if (status !== undefined && !VALID_STATUSES.includes(status)) {
            return res.status(400).json({ error: `status must be one of: ${VALID_STATUSES.join(', ')}` });
        }

        const scheduleValidation = ensureFutureAppointment(date, time);
        if (!scheduleValidation.ok) {
            return res.status(400).json({ error: scheduleValidation.error });
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