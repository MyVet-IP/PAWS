console.log("server 1a");
require('dotenv').config({ path: '../.env' });
const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const cors = require("cors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use(session({
    secret: "myvetsecret",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

const usersFilePath = path.join(__dirname, "data", "users.json");



function readUsers() {
    if (!fs.existsSync(usersFilePath)) return [];
    const data = fs.readFileSync(usersFilePath, "utf-8");
    return JSON.parse(data || "[]");
}

function saveUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback"
},

    async (accessToken, refreshToken, profile, done) => {

        const users = readUsers();

        let user = users.find(u => u.email === profile.emails[0].value);

        if (!user) {
            user = {
                id: Date.now(),
                name: profile.displayName,
                email: profile.emails[0].value,
                password: null,
                role: "owner"
            };

            users.push(user);
            saveUsers(users);
        }

        return done(null, user);
    }));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const users = readUsers();

        const userExists = users.find(user => user.email === email);
        if (userExists) {
            return res.status(400).json({ message: "Este correo ya está registrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: Date.now(),
            name,
            email,
            password: hashedPassword,
            role
        };

        users.push(newUser);
        saveUsers(users);

        res.status(201).json({ message: "Usuario registrado correctamente" });

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const users = readUsers();

        const user = users.find(user => user.email === email);

        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        res.status(200).json({
            message: "Login exitoso",
            role: user.role,
            name: user.name,
            email: user.email
        });

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
});


// Rutas Google


app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/index.html" }),
    (req, res) => {
        res.redirect("http://127.0.0.1:5500/dashboard-user.html");
    }
);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
