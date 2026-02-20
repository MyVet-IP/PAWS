// Middleware central de manejo de errores

function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  // Errores de validación de PostgreSQL
  if (err.code === '23505') {
    return res.status(400).json({
      error: 'El registro ya existe (valor duplicado)',
      detail: err.detail || null
    });
  }

  if (err.code === '23503') {
    return res.status(400).json({
      error: 'Referencia inválida: el registro relacionado no existe',
      detail: err.detail || null
    });
  }

  if (err.code === '23502') {
    return res.status(400).json({
      error: 'Campo obligatorio faltante',
      detail: err.detail || null
    });
  }

  // Error genérico
  console.error(`[ERROR ${status}] ${req.method} ${req.originalUrl} — ${message}`);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
}

module.exports = errorHandler;
