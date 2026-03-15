const emergenciesStorage = require('../storage/emergenciesStorage');
const businessesStorage = require('../storage/businessesStorage');

// EMERGENCIES

exports.getAll = async (req, res, next) => {
    try {
        const { status } = req.query;
        const emergencies = await emergenciesStorage.getAllEmergencies({ status });
        res.json(emergencies);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const emergency = await emergenciesStorage.getEmergencyById(req.params.id);
        if (!emergency) return res.status(404).json({ error: 'Emergencia no encontrada' });
        res.json(emergency);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { pet_id, business_id, description } = req.body;

        if (!pet_id || !business_id || !description) {
            return res.status(400).json({ error: 'pet_id, business_id y description son requeridos' });
        }

        const emergency = await emergenciesStorage.createEmergency({ pet_id, business_id, description });
        res.status(201).json(emergency);
    } catch (err) {
        next(err);
    }
};

exports.updateStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const allowed = ['open', 'in_progress', 'resolved'];

        if (!status || !allowed.includes(status)) {
            return res.status(400).json({ error: `status debe ser uno de: ${allowed.join(', ')}` });
        }

        const emergency = await emergenciesStorage.updateEmergencyStatus(req.params.id, status);
        res.json(emergency);
    } catch (err) {
        next(err);
    }
};

// EMERGENCY MESSAGES 

exports.getAllMessages = async (req, res, next) => {
    try {
        const messages = await emergenciesStorage.getAllMessages();
        res.json(messages);
    } catch (err) {
        next(err);
    }
};

exports.sendMessage = async (req, res, next) => {
    try {
        const { business_id, emergency_id, message, contact_name, contact_phone, channel } = req.body;

        if (!business_id || !message || !contact_name) {
            return res.status(400).json({ error: 'business_id, message y contact_name son requeridos' });
        }

        const business = await businessesStorage.getById(business_id);
        if (!business) return res.status(404).json({ error: 'Negocio no encontrado' });

        const registro = await emergenciesStorage.createMessage({
            business_id, emergency_id, message, contact_name, contact_phone, channel
        });

        // Generar link de WhatsApp si el negocio tiene número
        let whatsappLink = null;
        if (business.whatsapp) {
            const text = encodeURIComponent(`EMERGENCIA - ${contact_name}: ${message}`);
            whatsappLink = `https://wa.me/${business.whatsapp}?text=${text}`;
        }

        res.status(201).json({
            message: registro,
            whatsappLink,
            business: {
                name: business.name,
                phone: business.phone,
                whatsapp: business.whatsapp
            }
        });
    } catch (err) {
        next(err);
    }
};