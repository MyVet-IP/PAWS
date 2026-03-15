const db = require('../db');
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

class AuthStorage {
    async getUserByEmail(email) {
        return db.get(`SELECT * FROM users WHERE email = $1`, [email]);
    }

    async getUserById(user_id) {
        return db.get(`SELECT * FROM users WHERE user_id = $1`, [user_id]);
    }

    async createUser({ name, email, password, phone = null, role = 'user' }) {
        const hashed = await bcrypt.hash(password, SALT_ROUNDS);
        const result = await db.get(
            `INSERT INTO users (name, email, password, phone, role)
       VALUES ($1, $2, $3, $4, $5) RETURNING user_id`,
            [name, email, hashed, phone, role]
        );
        return db.get(
            `SELECT user_id, name, email, phone, role, created_at
       FROM users WHERE user_id = $1`,
            [result.user_id]
        );
    }

    async verifyPassword(plainText, hashed) {
        return bcrypt.compare(plainText, hashed);
    }

    async createRefreshToken(user_id, token, expiresAt) {
        return db.get(
            'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3) RETURNING id',
            [user_id, token, expiresAt]
        );
    }

    async getRefreshToken(token) {
        return db.get('SELECT * FROM refresh_tokens WHERE token = $1', [token]);
    }

    async deleteRefreshToken(token) {
        await db.run('DELETE FROM refresh_tokens WHERE token = $1', [token]);
        return { success: true };
    }
}

module.exports = new AuthStorage();