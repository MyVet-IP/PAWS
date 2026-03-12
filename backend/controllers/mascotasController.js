const mascotasStorage = require('../storage/mascotasStorage');

exports.getAll = async (req, res, next) => {
    try {
        const mascotas = await mascotasStorage.getAllMascotas();
        res.json(mascotas);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const mascota = await mascotasStorage.getMascotaById(req.params.id);
        if (!mascota) return res.status(404).json({ error: 'Mascota no encontrada' });
        res.json(mascota);
    } catch (err) {
        next(err);
    }
};

exports.getByCliente = async (req, res, next) => {
    try {
        const mascotas = await mascotasStorage.getMascotasByCliente(req.params.id_cliente);
        res.json(mascotas);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { nombre, especie, raza, edad, id_cliente } = req.body;
        if (!nombre || !especie || !id_cliente) {
            return res.status(400).json({ error: 'nombre, especie e id_cliente son requeridos' });
        }
        const mascota = await mascotasStorage.createMascota(nombre, especie, raza, edad, id_cliente);
        res.status(201).json(mascota);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const mascota = await mascotasStorage.updateMascota(req.params.id, req.body);
        res.json(mascota);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        await mascotasStorage.deleteMascota(req.params.id);
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
};
