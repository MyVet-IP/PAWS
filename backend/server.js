console.log("server 1a");

// ❌ YA EXISTE EN app.js
// require('dotenv').config({ path: '../.env' });

// ❌ YA EXISTE EN app.js
// const express = require("express");

// ❌ YA EXISTE EN app.js
// const cors = require("cors");

// ❌ YA EXISTE EN app.js
// const app = express();

// ❌ YA EXISTE EN app.js
// app.use(cors());
// app.use(express.json());


// ⚠️ TEMPORALMENTE IMPORTAMOS app DESDE app.js
// La idea futura es que server.js solo levante el servidor
const app = require("./app");


const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

// ⚠️ ESTO TODAVÍA NO ESTÁ IMPLEMENTADO EN app.js
// En el futuro debería migrarse allá
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");


const PORT = 4000;



// SESIONES
//  FUTURO: mover a app.js


app.use(session({
    secret: "myvetsecret",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


// ARCHIVO DE USUARIOS
// ⚠️ mover a app.js 


const usersFilePath = path.join(__dirname, "data", "users.json");


function readUsers() {
    if (!fs.existsSync(usersFilePath)) return [];
    const data = fs.readFileSync(usersFilePath, "utf-8");
    return JSON.parse(data || "[]");
}

function saveUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}


// GOOGLE AUTH
// ⚠️  mover a app.js


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



// REGISTER
// ⚠️  mover a app.js


app.post("/api/register", async (req, res) => {

    const { name, email, password, role } = req.body;

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

});




// GOOGLE ROUTES
// ⚠️  mover a app.js


app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/index.html" }),
    (req, res) => {
        res.redirect("http://127.0.0.1:5500/dashboard-user.html");
    }
);



// SERVER START


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});