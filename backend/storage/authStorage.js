const db = require('../db');

class AuthStorage {
  // store a refresh token record
  async createRefreshToken(id_cliente, token, expiresAt) {
    const row = await db.get(
      'INSERT INTO refresh_tokens (id_cliente, token, expires_at) VALUES ($1, $2, $3) RETURNING id',
      [id_cliente, token, expiresAt]
    );
    return row;
  }

  async getRefreshToken(token) {
    return await db.get('SELECT * FROM refresh_tokens WHERE token = $1', [token]);
  }

  async deleteRefreshToken(token) {
    await db.run('DELETE FROM refresh_tokens WHERE token = $1', [token]);
    return { success: true };
  }

  async deleteTokensByUser(id_cliente) {
    await db.run('DELETE FROM refresh_tokens WHERE id_cliente = $1', [id_cliente]);
    return { success: true };
  }
}

module.exports = new AuthStorage();
