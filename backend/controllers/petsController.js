const storage = require('../storage');

exports.getAll = async (req, res, next) => {
    try {
        const mascotas = await storage.getAllMascotas();
        res.json(mascotas);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const mascota = await storage.getMascotaById(req.params.id);

        if (!mascota) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }

        res.json(mascota);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { nombre, especie, raza, edad, id_cliente } = req.body;

        // minimo necesitamos estos tres campos
        if (!nombre || !especie || !id_cliente) {
            return res.status(400).json({ error: 'nombre, especie e id_cliente son requeridos' });
        }

        const mascota = await storage.createMascota(nombre, especie, raza, edad, id_cliente);
        res.status(201).json(mascota);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const mascotaActualizada = await storage.updateMascota(req.params.id, req.body);
        res.json(mascotaActualizada);
    } catch (err) {
        next(err);
    }
};
