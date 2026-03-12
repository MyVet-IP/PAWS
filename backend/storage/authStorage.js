const db = require('../db');

module.exports = {
    async getClienteByEmail(email) {
        return db.get('SELECT * FROM clientes WHERE email = $1', [email]);
    },

    async createCliente(nombre, email, password, telefono = null) {
        const result = await db.get(
            'INSERT INTO clientes (nombre, email, password, telefono) VALUES ($1, $2, $3, $4) RETURNING id_cliente',
            [nombre, email, password, telefono]
        );
        return db.get(
            'SELECT id_cliente, nombre, email, telefono, role FROM clientes WHERE id_cliente = $1',
            [result.id_cliente]
        );
    }
};
