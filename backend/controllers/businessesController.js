const businessesStorage = require('../storage/businessesStorage');

exports.getAll = async (req, res, next) => {
    try {
        const { type, zone } = req.query;
        const businesses = await businessesStorage.getAll({ type, zone });
        res.json(businesses);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const business = await businessesStorage.getById(req.params.id);
        if (!business) return res.status(404).json({ error: 'Negocio no encontrado' });
        res.json(business);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { user_id, business_type, name, address } = req.body;

        if (!user_id || !business_type || !name || !address) {
            return res.status(400).json({ error: 'user_id, business_type, name y address son requeridos' });
        }

        const business = await businessesStorage.create(req.body);
        res.status(201).json(business);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const business = await businessesStorage.update(req.params.id, req.body);
        res.json(business);
    } catch (err) {
        next(err);
    }
};

exports.getSchedule = async (req, res, next) => {
    try {
        const schedule = await businessesStorage.getSchedule(req.params.id);
        res.json(schedule);
    } catch (err) {
        next(err);
    }
};

exports.getAllSpecialties = async (req, res, next) => {
    try {
        const specialties = await businessesStorage.getAllSpecialties();
        res.json(specialties);
    } catch (err) {
        next(err);
    }
};

exports.getAllAnimalTypes = async (req, res, next) => {
    try {
        const types = await businessesStorage.getAllAnimalTypes();
        res.json(types);
    } catch (err) {
        next(err);
    }
};