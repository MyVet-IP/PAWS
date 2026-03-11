const storage = require('../storage');

// trae los datos del dashboard del usuario: su info + sus mascotas con visitas
exports.getDashboard = async (req, res, next) => {
  try {
    const idUsuario = req.params.id;
    const dashboard = await storage.getUserDashboard(idUsuario);
    res.json(dashboard);
  } catch (err) {
    next(err);
  }
};
