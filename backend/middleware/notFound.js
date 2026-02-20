function notFound(req, res, next) {
  // Chrome DevTools hace esta petición automáticamente, la ignoramos
  if (req.path.startsWith('/.well-known/')) return res.status(204).end();

  const err = new Error(`${req.method} ${req.originalUrl} — no existe`);
  err.status = 404;
  next(err);
}

module.exports = notFound;
