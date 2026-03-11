const storage = require('../storage');

exports.getAll = async (req, res, next) => {
  try {
    const clientes = await storage.getAllClientes();
    res.json(clientes);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cliente = await storage.getClienteById(id);

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.json(cliente);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { nombre, email, password, telefono } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: 'nombre, email y contrasenia son obligatorios' });
    }

    const nuevoCliente = await storage.createCliente(nombre, email, password, telefono);
    res.status(201).json(nuevoCliente);

  } catch (err) {
    // TODO: mejorar el manejo de este error mas adelante
    if (err.message.includes('UNIQUE constraint failed') || err.message.includes('unique')) {
      return res.status(400).json({ error: 'El email ya existe' });
    }
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const clienteActualizado = await storage.updateCliente(req.params.id, req.body);
    res.json(clienteActualizado);
  } catch (err) {
    next(err);
  }
};
