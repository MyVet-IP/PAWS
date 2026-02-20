// Middleware de validación de campos requeridos en el body

function validateBody(requiredFields) {
  return (req, res, next) => {
    const missing = requiredFields.filter(field => {
      const val = req.body[field];
      return val === undefined || val === null || val === '';
    });

    if (missing.length > 0) {
      return res.status(400).json({
        error: `Campos obligatorios faltantes: ${missing.join(', ')}`
      });
    }

    next();
  };
}

module.exports = validateBody;
