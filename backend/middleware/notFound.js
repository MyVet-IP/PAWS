function notFound(req, res, next) {
  if (req.path.startsWith('/.well-known/')) return res.status(204).end();
  if (req.path === '/favicon.ico') return res.status(204).end();

  const err = new Error(`${req.method} ${req.originalUrl} — not found`);
  err.status = 404;
  next(err);
}

module.exports = notFound;
