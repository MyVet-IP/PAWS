function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const msg = err.message || 'Error interno del servidor';

  if (err.code === '23505') {
    return res.status(400).json({ error: 'Ya existe un registro con ese valor', detail: err.detail || null });
  }
  if (err.code === '23503') {
    return res.status(400).json({ error: 'El registro relacionado no existe', detail: err.detail || null });
  }
  if (err.code === '23502') {
    return res.status(400).json({ error: 'Falta un campo requerido', detail: err.detail || null });
  }

  console.error(`[${status}] ${req.method} ${req.originalUrl} - ${msg}`);
  if (process.env.NODE_ENV !== 'production') console.error(err.stack);

  res.status(status).json({
    error: msg,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
}

module.exports = errorHandler;
