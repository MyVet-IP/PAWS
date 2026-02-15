exports.register = (req, res) => {
    const { name, email, password } = req.body;

    console.log("Datos recibidos:", req.body);

    

    res.status(201).json({
        message: "Usuario registrado correctamente",
        user: {
            name,
            email
        }
    });
};
