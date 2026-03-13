const storage = require('../storage');

exports.getDashboard = async (req, res, next) => {
    try {
        const idUsuario = req.params.id;
        const dashboard = await storage.getUserDashboard(idUsuario);
        res.json(dashboard);
    } catch (err) {
        next(err);
    }
};
