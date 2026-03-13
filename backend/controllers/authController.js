const clientesStorage = require('../storage/clientesStorage');

exports.register = async (req, res, next) => {
    try {
        const { nombre, email, password, telefono } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({ error: 'Nombre, email y contrasenia son requeridos' });
        }

        const cliente = await clientesStorage.createCliente(nombre, email, password, telefono);

        const { password: _pw, ...user } = cliente;
        res.status(201).json(user);

    } catch (err) {
        if (err.message.includes('duplicate') || err.message.includes('unique')) {
            return res.status(400).json({ error: 'El email ya esta registrado' });
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contrasenia son requeridos' });
        }

        const cliente = await clientesStorage.getClienteByEmail(email);

        if (!cliente || cliente.password !== password) {
            return res.status(401).json({ error: 'Credenciales invalidas' });
        }

        const { password: _pw, ...user } = cliente;
        res.json(user);

    } catch (err) {
        next(err);
    }
};
