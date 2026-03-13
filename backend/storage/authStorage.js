const db = require('../db');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

module.exports = {
    async getUserByEmail(email) {
        return db.get(`SELECT * FROM users WHERE email = $1`, [email]);
    },

    async createUser({ name, email, password, phone = null, role = 'user' }) {
        const hashed = await bcrypt.hash(password, SALT_ROUNDS);
        const result = await db.get(
            `INSERT INTO users (name, email, password, phone, role)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING user_id`,
            [name, email, hashed, phone, role]
        );
        return db.get(
            `SELECT user_id, name, email, phone, role, created_at
            FROM users WHERE user_id = $1`,
            [result.user_id]
        );
    },

    async verifyPassword(plainText, hashed) {
        return bcrypt.compare(plainText, hashed);
    }
};