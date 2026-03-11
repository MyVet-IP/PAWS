const storage = require('../storage');

// devuelve todos los mensajes de emergencia registrados
exports.getAllMessages = async (req, res, next) => {
  try {
    const messages = await storage.getAllEmergencyMessages();
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

// envia un mensaje de emergencia y genera el link de whatsapp
exports.sendMessage = async (req, res, next) => {
  try {
    const { mensaje, nombre_contacto, telefono_contacto, id_veterinaria, id_emergencia } = req.body;

    // primero verificamos que la clinica exista
    const vet = await storage.getVeterinariaById(id_veterinaria);
    if (!vet) {
      return res.status(404).json({ error: 'Clinica no encontrada' });
    }

    const registro = await storage.createEmergencyMessage(
      mensaje, nombre_contacto, telefono_contacto, id_veterinaria, id_emergencia || null
    );

    // el link de whatsapp solo lo generamos si la clinica tiene numero de whatsapp
    let whatsappLink = null;
    if (vet.whatsapp) {
      const texto = `EMERGENCIA - ${nombre_contacto}: ${mensaje}`;
      whatsappLink = `https://wa.me/${vet.whatsapp}?text=${encodeURIComponent(texto)}`;
    }

    res.status(201).json({
      mensaje: registro,
      whatsappLink,
      veterinaria: {
        nombre: vet.nombre,
        telefono: vet.telefono,
        whatsapp: vet.whatsapp
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const emergencias = await storage.getAllEmergencias();
    res.json(emergencias);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { descripcion, id_mascota, id_veterinaria } = req.body;

    if (!descripcion || !id_mascota || !id_veterinaria) {
      return res.status(400).json({ error: 'descripcion, id_mascota e id_veterinaria son requeridos' });
    }

    const emergencia = await storage.createEmergencia(descripcion, id_mascota, id_veterinaria);
    res.status(201).json(emergencia);
  } catch (err) {
    next(err);
  }
};
