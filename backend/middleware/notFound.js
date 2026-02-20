// Middleware para rutas no encontradas (404)

function notFound(req, res, next) {
  const error = new Error(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  error.status = 404;
  next(error);
}

module.exports = notFound;
