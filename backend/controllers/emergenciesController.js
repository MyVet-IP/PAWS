const emergencyStorage = require('../storage/emergencyStorage');
const veterinariasStorage = require('../storage/veterinariasStorage');

exports.getAllMessages = async (req, res, next) => {
    try {
        const messages = await emergencyStorage.getAllEmergencyMessages();
        res.json(messages);
    } catch (err) {
        next(err);
    }
};

exports.sendMessage = async (req, res, next) => {
    try {
        const { mensaje, nombre_contacto, telefono_contacto, id_veterinaria, id_emergencia } = req.body;

        const vet = await veterinariasStorage.getVeterinariaById(id_veterinaria);
        if (!vet) {
            return res.status(404).json({ error: 'Clinica no encontrada' });
        }

        const registro = await emergencyStorage.createEmergencyMessage(
            mensaje, nombre_contacto, telefono_contacto, id_veterinaria, id_emergencia || null
        );

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
        const emergencias = await emergencyStorage.getAllEmergencias();
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

        const emergencia = await emergencyStorage.createEmergencia(descripcion, id_mascota, id_veterinaria);
        res.status(201).json(emergencia);
    } catch (err) {
        next(err);
    }
};
