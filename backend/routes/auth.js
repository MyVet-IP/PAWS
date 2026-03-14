const express = require("express");
const router = express.Router();

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcrypt");

const db = require("../db");
const authController = require("../controllers/authController");


/* LOGIN NORMAL */

router.post("/register", authController.register);
router.post("/login", authController.login);


/* GOOGLE STRATEGY */

passport.use(new GoogleStrategy({

    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"

}, async (accessToken, refreshToken, profile, done) => {

    try {

        const email =
            profile.emails?.[0]?.value ||
            profile._json?.email;

        const name = profile.displayName;

        if (!email) {
            return done(new Error("Google account has no email"), null);
        }

        return done(null, { email, name });

    } catch (error) {

        return done(error, null);

    }

}));


/* LOGIN GOOGLE */
router.get("/google", (req, res, next) => {

    const role = req.query.role || "user";

    passport.authenticate("google", {
        scope: ["profile", "email"],
        state: role
    })(req, res, next);

});


/* CALLBACK GOOGLE */

router.get("/google/callback",

    passport.authenticate("google", { failureRedirect: "/#/login" }),

    async (req, res) => {

        try {

            const role = req.query.state || "user";

            const email = req.user.email;
            const name = req.user.name;

            let user = await db.get(
                "SELECT * FROM users WHERE email = $1",
                [email]
            );

            if (!user) {

                const fakePassword = await bcrypt.hash("google_login", 10);

                const result = await db.run(
                    "INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4)",
                    [name, email, fakePassword, role]
                );
            }

            const userRole = user ? user.role : role;

            if (userRole === "business") {
                return res.redirect("http://localhost:3000/#/veterinary");
            }

            return res.redirect("http://localhost:3000/#/user-dashboard");

        } catch (error) {

            console.error(error);

            res.redirect("http://localhost:3000/#/login");

        }

    }

);

module.exports = router;