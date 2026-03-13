const veterinariasStorage = require('../storage/veterinariasStorage');

exports.getAll = async (req, res, next) => {
    try {
        const { location } = req.query;
        const vets = location
            ? await veterinariasStorage.getVeterinariasByLocation(location)
            : await veterinariasStorage.getAllVeterinarias();
        res.json(vets);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const vet = await veterinariasStorage.getVeterinariaById(req.params.id);
        if (!vet) return res.status(404).json({ error: 'Veterinaria no encontrada' });
        res.json(vet);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { nombre, direccion } = req.body;
        if (!nombre || !direccion) {
            return res.status(400).json({ error: 'nombre y direccion son requeridos' });
        }
        const vet = await veterinariasStorage.createVeterinaria(req.body);
        res.status(201).json(vet);
    } catch (err) {
        next(err);
    }
};

exports.getSpecialties = async (req, res, next) => {
    try {
        const specialties = await veterinariasStorage.getAllSpecialties();
        res.json(specialties);
    } catch (err) {
        next(err);
    }
};

exports.getSchedules = async (req, res, next) => {
    try {
        const schedules = await veterinariasStorage.getSchedulesByVeterinaria(req.params.id);
        res.json(schedules);
    } catch (err) {
        next(err);
    }
};
