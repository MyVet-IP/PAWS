const db = require('../db');

module.exports = {
    async getAllClientes() {
        return db.all(
            'SELECT id_cliente, nombre, email, telefono, role FROM clientes ORDER BY id_cliente ASC'
        );
    },

    async getClienteById(id) {
        return db.get(
            'SELECT id_cliente, nombre, email, telefono, role FROM clientes WHERE id_cliente = $1',
            [id]
        );
    },

    async getClienteByEmail(email) {
        return db.get('SELECT * FROM clientes WHERE email = $1', [email]);
    },

    async createCliente(nombre, email, password, telefono = null) {
        const result = await db.get(
            'INSERT INTO clientes (nombre, email, password, telefono) VALUES ($1, $2, $3, $4) RETURNING id_cliente',
            [nombre, email, password, telefono]
        );
        return this.getClienteById(result.id_cliente);
    },

    async updateCliente(id, data) {
        const fields = [];
        const values = [];
        let paramCount = 1;

        if (data.nombre !== undefined) {
            fields.push(`nombre = $${paramCount++}`);
            values.push(data.nombre);
        }
        if (data.email !== undefined) {
            fields.push(`email = $${paramCount++}`);
            values.push(data.email);
        }
        if (data.telefono !== undefined) {
            fields.push(`telefono = $${paramCount++}`);
            values.push(data.telefono);
        }

        if (fields.length === 0) return this.getClienteById(id);

        values.push(id);
        await db.run(
            `UPDATE clientes SET ${fields.join(', ')} WHERE id_cliente = $${paramCount}`,
            values
        );
        return this.getClienteById(id);
    },

    async getUserDashboard(id_cliente) {
        const cliente = await this.getClienteById(id_cliente);
        const mascotas = await db.all(
            'SELECT * FROM mascotas WHERE id_cliente = $1 ORDER BY id_mascota ASC',
            [id_cliente]
        );
        for (const mascota of mascotas) {
            mascota.visitas = await db.all(
                `SELECT v.*, vet.nombre AS veterinaria_nombre
                  FROM visitas v
                  INNER JOIN veterinarias vet ON vet.id_veterinaria = v.id_veterinaria
                  WHERE v.id_mascota = $1
                  ORDER BY v.fecha DESC`,
                [mascota.id_mascota]
            );
        }
        return { cliente, mascotas };
    }
};
