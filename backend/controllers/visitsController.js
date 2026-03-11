const storage = require('../storage');

exports.getAll = async (req, res, next) => {
  try {
    const visitas = await storage.getAllVisitas();
    res.json(visitas);
  } catch (err) {
    next(err);
  }
};

// trae las visitas de una mascota especifica por su id
exports.getByPet = async (req, res, next) => {
  try {
    const idMascota = req.params.id;
    const visitas = await storage.getVisitasByMascota(idMascota);
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

    const visita = await storage.createVisita(diagnostico, medicamentos, chequeos, id_mascota, id_veterinaria);
    res.status(201).json(visita);
  } catch (err) {
    next(err);
  }
};

// esto es para cuando se agenda una cita desde el frontend
exports.createAppointment = async (req, res, next) => {
  try {
    const { id_mascota, id_veterinaria, motivo } = req.body;

    if (!id_mascota || !id_veterinaria) {
      return res.status(400).json({ error: 'id_mascota e id_veterinaria son requeridos' });
    }

    // si no mandan motivo usamos uno por defecto
    const motivoFinal = motivo || 'Cita programada';
    const visita = await storage.createVisita(motivoFinal, null, null, id_mascota, id_veterinaria);
    res.status(201).json(visita);
  } catch (err) {
    next(err);
  }
};
