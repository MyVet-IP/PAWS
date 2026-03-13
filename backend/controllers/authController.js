const authStorage = require('../storage/authStorage');

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, phone, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'name, email y password son requeridos' });
        }

        const existing = await authStorage.getUserByEmail(email);
        if (existing) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        const user = await authStorage.createUser({ name, email, password, phone, role });
        res.status(201).json(user);

    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'email y password son requeridos' });
        }

        const user = await authStorage.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const valid = await authStorage.verifyPassword(password, user.password);
        if (!valid) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const { password: _pw, ...safeUser } = user;
        res.json(safeUser);

    } catch (err) {
        next(err);
    }
};