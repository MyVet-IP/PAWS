const serviciosStorage = require('../storage/serviciosStorage');

exports.getAll = async (req, res, next) => {
    try {
        const servicios = await serviciosStorage.getAllServicios();
        res.json(servicios);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const servicio = await serviciosStorage.getServicioById(req.params.id);
        if (!servicio) return res.status(404).json({ error: 'Servicio no encontrado' });
        res.json(servicio);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: 'name es requerido' });
        const servicio = await serviciosStorage.createServicio(name);
        res.status(201).json(servicio);
    } catch (err) {
        next(err);
    }
};
