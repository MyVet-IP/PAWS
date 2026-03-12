const db = require('../db');

module.exports = {
    async getAllMascotas() {
        return db.all(
            `SELECT m.*, c.nombre AS cliente_nombre
              FROM mascotas m
              INNER JOIN clientes c ON c.id_cliente = m.id_cliente
              ORDER BY m.id_mascota ASC`
        );
    },

    async getMascotaById(id) {
        return db.get(
            `SELECT m.*, c.nombre AS cliente_nombre, c.email AS cliente_email, c.telefono AS cliente_telefono
              FROM mascotas m
              INNER JOIN clientes c ON c.id_cliente = m.id_cliente
              WHERE m.id_mascota = $1`,
            [id]
        );
    },

    async getMascotasByCliente(id_cliente) {
        return db.all(
            'SELECT * FROM mascotas WHERE id_cliente = $1 ORDER BY id_mascota ASC',
            [id_cliente]
        );
    },

    async createMascota(nombre, especie, raza = null, edad = null, id_cliente) {
        const result = await db.get(
            'INSERT INTO mascotas (nombre, especie, raza, edad, id_cliente) VALUES ($1, $2, $3, $4, $5) RETURNING id_mascota',
            [nombre, especie, raza, edad, id_cliente]
        );
        return this.getMascotaById(result.id_mascota);
    },

    async updateMascota(id, data) {
        const fields = [];
        const values = [];
        let paramCount = 1;

        if (data.nombre !== undefined) {
            fields.push(`nombre = $${paramCount++}`);
            values.push(data.nombre);
        }
        if (data.especie !== undefined) {
            fields.push(`especie = $${paramCount++}`);
            values.push(data.especie);
        }
        if (data.raza !== undefined) {
            fields.push(`raza = $${paramCount++}`);
            values.push(data.raza);
        }
        if (data.edad !== undefined) {
            fields.push(`edad = $${paramCount++}`);
            values.push(data.edad);
        }

        if (fields.length === 0) return this.getMascotaById(id);

        values.push(id);
        await db.run(
            `UPDATE mascotas SET ${fields.join(', ')} WHERE id_mascota = $${paramCount}`,
            values
        );
        return this.getMascotaById(id);
    },

    async deleteMascota(id) {
        await db.run('DELETE FROM mascotas WHERE id_mascota = $1', [id]);
        return { success: true };
    }
};
