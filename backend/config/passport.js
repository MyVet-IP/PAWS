// ─────────────────────────────────────────────
//  config/passport.js
//  Centraliza toda la configuración de Passport:
//  serialize/deserialize + Google OAuth strategy.
//  Se importa UNA VEZ en app.js antes de las rutas.
// ─────────────────────────────────────────────
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../db');

// ── Serialize / Deserialize ──────────────────────────────────────────────────
passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
    try {
        const user = await db.get(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// ── Google OAuth Strategy ────────────────────────────────────────────────────
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email =
                    profile.emails?.[0]?.value ||
                    profile._json?.email;

                const name = profile.displayName;

                if (!email) {
                    return done(new Error('Google account has no email'), null);
                }

                return done(null, { email, name });
            } catch (error) {
                return done(error, null);
            }
        }
    ));
}

module.exports = passport;