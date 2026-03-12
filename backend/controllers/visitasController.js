const visitasStorage = require('../storage/visitasStorage');

exports.getAll = async (req, res, next) => {
    try {
        const visitas = await visitasStorage.getAllVisitas();
        res.json(visitas);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const visita = await visitasStorage.getVisitaById(req.params.id);
        if (!visita) return res.status(404).json({ error: 'Visita no encontrada' });
        res.json(visita);
    } catch (err) {
        next(err);
    }
};

exports.getByMascota = async (req, res, next) => {
    try {
        const visitas = await visitasStorage.getVisitasByMascota(req.params.id_mascota);
        res.json(visitas);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { diagnostico, medicamentos, chequeos, id_mascota, id_veterinaria } = req.body;
        if (!id_mascota || !id_veterinaria) {
            return res.status(400).json({ error: 'id_mascota e id_veterinaria son requeridos' });
        }
        const visita = await visitasStorage.createVisita(diagnostico, medicamentos, chequeos, id_mascota, id_veterinaria);
        res.status(201).json(visita);
    } catch (err) {
        next(err);
    }
};
