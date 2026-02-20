function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const msg = err.message || 'Internal server error';

  if (err.code === '23505') {
    return res.status(400).json({ error: 'A record with that value already exists', detail: err.detail || null });
  }
  if (err.code === '23503') {
    return res.status(400).json({ error: 'Related record does not exist', detail: err.detail || null });
  }
  if (err.code === '23502') {
    return res.status(400).json({ error: 'A required field is missing', detail: err.detail || null });
  }

  console.error(`[${status}] ${req.method} ${req.originalUrl} - ${msg}`);
  if (process.env.NODE_ENV !== 'production') console.error(err.stack);

  res.status(status).json({
    error: msg,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
}

module.exports = errorHandler;
