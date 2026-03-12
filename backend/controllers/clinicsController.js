const storage = require('../storage');

exports.getAll = async (req, res, next) => {
    try {
        const { location } = req.query;
        let veterinarias;

        if (location) {
            veterinarias = await storage.getVeterinariasByLocation(location);
        } else {
            veterinarias = await storage.getAllVeterinarias();
        }

        const resultado = veterinarias.map(vet => {
            return {
                ...vet,
                specialties: vet.specialties.map(s => s.name.toUpperCase()),
                image: vet.imagen,
                location: vet.direccion
            };
        });

        res.json(resultado);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const veterinaria = await storage.getVeterinariaById(req.params.id);

        if (!veterinaria) {
            return res.status(404).json({ error: 'Clinica no encontrada' });
        }

        veterinaria.specialties = veterinaria.specialties.map(s => s.name.toUpperCase());
        veterinaria.image = veterinaria.imagen;
        veterinaria.location = veterinaria.direccion;

        res.json(veterinaria);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { nombre, direccion, telefono, estado, rating, imagen } = req.body;

        if (!nombre || !direccion) {
            return res.status(400).json({ error: 'nombre y direccion son obligatorios' });
        }

        const nueva = await storage.createVeterinaria(nombre, direccion, telefono, estado, rating, imagen);
        res.status(201).json(nueva);
    } catch (err) {
        next(err);
    }
};

exports.getAllSpecialties = async (req, res, next) => {
    try {
        const specialties = await storage.getAllSpecialties();
        res.json(specialties);
    } catch (err) {
        next(err);
    }
};

exports.createSpecialty = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'el campo name es requerido' });
        }

        const specialty = await storage.createSpecialty(name);
        res.status(201).json(specialty);
    } catch (err) {
        next(err);
    }
};
