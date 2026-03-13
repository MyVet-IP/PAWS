const usersStorage = require('../storage/usersStorage');

exports.getAll = async (req, res, next) => {
    try {
        const users = await usersStorage.getAll();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const user = await usersStorage.getById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(user);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const user = await usersStorage.update(req.params.id, req.body);
        res.json(user);
    } catch (err) {
        next(err);
    }
};

exports.getDashboard = async (req, res, next) => {
    try {
        const dashboard = await usersStorage.getDashboard(req.params.id);
        if (!dashboard) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(dashboard);
    } catch (err) {
        next(err);
    }
};