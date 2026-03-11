const storage = require('../storage');

// registro de nuevo usuario
exports.register = async (req, res, next) => {
  try {
    const { nombre, email, password, telefono } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: 'Nombre, email y contrasenia son requeridos' });
    }

    const cliente = await storage.createCliente(nombre, email, password, telefono);

    // no devolver la contrasenia en la respuesta
    const { password: _pw, ...user } = cliente;
    res.status(201).json(user);

  } catch (err) {
    // si el email ya existe postgres lanza un error de unique constraint
    if (err.message.includes('duplicate') || err.message.includes('unique')) {
      return res.status(400).json({ error: 'El email ya esta registrado' });
    }
    next(err);
  }
};

// login - verificar credenciales y devolver el usuario sin contrasenia
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contrasenia son requeridos' });
    }

    const cliente = await storage.getClienteByEmail(email);

    // si no existe el usuario o la contrasenia no coincide
    if (!cliente || cliente.password !== password) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }

    const { password: _pw, ...user } = cliente;
    res.json(user);

  } catch (err) {
    next(err);
  }
};
