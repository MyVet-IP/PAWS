const clientesStorage = require('../storage/clientesStorage');

exports.getAll = async (req, res, next) => {
    try {
        const clientes = await clientesStorage.getAllClientes();
        res.json(clientes);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const cliente = await clientesStorage.getClienteById(req.params.id);
        if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.json(cliente);
    } catch (err) {
        next(err);
    }
};

exports.getDashboard = async (req, res, next) => {
    try {
        const dashboard = await clientesStorage.getUserDashboard(req.params.id);
        if (!dashboard.cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.json(dashboard);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const cliente = await clientesStorage.updateCliente(req.params.id, req.body);
        res.json(cliente);
    } catch (err) {
        next(err);
    }
};
