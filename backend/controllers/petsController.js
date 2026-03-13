const petsStorage = require('../storage/petsStorage');

exports.getAll = async (req, res, next) => {
    try {
        const pets = await petsStorage.getAll();
        res.json(pets);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const pet = await petsStorage.getById(req.params.id);
        if (!pet) return res.status(404).json({ error: 'Mascota no encontrada' });
        res.json(pet);
    } catch (err) {
        next(err);
    }
};

exports.getByUser = async (req, res, next) => {
    try {
        const pets = await petsStorage.getByUser(req.params.user_id);
        res.json(pets);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { name, species, breed, birth_date, weight_kg, user_id } = req.body;

        if (!name || !species || !user_id) {
            return res.status(400).json({ error: 'name, species y user_id son requeridos' });
        }

        const pet = await petsStorage.create({ name, species, breed, birth_date, weight_kg, user_id });
        res.status(201).json(pet);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const pet = await petsStorage.update(req.params.id, req.body);
        res.json(pet);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await petsStorage.remove(req.params.id);
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
};