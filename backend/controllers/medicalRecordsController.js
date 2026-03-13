const medicalRecordsStorage = require('../storage/medicalRecordsStorage');

exports.getAll = async (req, res, next) => {
    try {
        const records = await medicalRecordsStorage.getAll();
        res.json(records);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const record = await medicalRecordsStorage.getById(req.params.id);
        if (!record) return res.status(404).json({ error: 'Registro médico no encontrado' });
        res.json(record);
    } catch (err) {
        next(err);
    }
};

exports.getByPet = async (req, res, next) => {
    try {
        const records = await medicalRecordsStorage.getByPet(req.params.pet_id);
        res.json(records);
    } catch (err) {
        next(err);
    }
};

exports.getByUser = async (req, res, next) => {
    try {
        const records = await medicalRecordsStorage.getByUser(req.params.user_id);
        res.json(records);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { pet_id, user_id, visit_type } = req.body;

        if (!pet_id || !user_id || !visit_type) {
            return res.status(400).json({ error: 'pet_id, user_id y visit_type son requeridos' });
        }

        const record = await medicalRecordsStorage.create(req.body);
        res.status(201).json(record);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const record = await medicalRecordsStorage.update(req.params.id, req.body);
        res.json(record);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await medicalRecordsStorage.remove(req.params.id);
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
};