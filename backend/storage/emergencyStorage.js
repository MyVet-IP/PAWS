const db = require('../db');

module.exports = {
    async getAllEmergencias() {
        return db.all(
            `SELECT e.*, m.nombre AS mascota_nombre, vet.nombre AS veterinaria_nombre
              FROM emergencias e
              INNER JOIN mascotas m ON m.id_mascota = e.id_mascota
              INNER JOIN veterinarias vet ON vet.id_veterinaria = e.id_veterinaria
              ORDER BY e.fecha DESC`
        );
    },

    async getEmergenciaById(id) {
        return db.get(
            `SELECT e.*, m.nombre AS mascota_nombre, vet.nombre AS veterinaria_nombre
              FROM emergencias e
              INNER JOIN mascotas m ON m.id_mascota = e.id_mascota
              INNER JOIN veterinarias vet ON vet.id_veterinaria = e.id_veterinaria
              WHERE e.id_emergencia = $1`,
            [id]
        );
    },

    async createEmergencia(descripcion, id_mascota, id_veterinaria) {
        const result = await db.get(
            'INSERT INTO emergencias (descripcion, id_mascota, id_veterinaria) VALUES ($1, $2, $3) RETURNING id_emergencia',
            [descripcion, id_mascota, id_veterinaria]
        );
        return this.getEmergenciaById(result.id_emergencia);
    },

    async createEmergencyMessage(mensaje, nombre_contacto, telefono_contacto, id_veterinaria, id_emergencia = null) {
        const result = await db.get(
            `INSERT INTO emergency_messages (mensaje, nombre_contacto, telefono_contacto, id_veterinaria, id_emergencia)
              VALUES ($1, $2, $3, $4, $5) RETURNING id_mensaje`,
            [mensaje, nombre_contacto, telefono_contacto, id_veterinaria, id_emergencia]
        );
        return db.get('SELECT * FROM emergency_messages WHERE id_mensaje = $1', [result.id_mensaje]);
    },

    async getAllEmergencyMessages() {
        return db.all(
            `SELECT em.*, v.nombre AS veterinaria_nombre, v.whatsapp
              FROM emergency_messages em
              INNER JOIN veterinarias v ON v.id_veterinaria = em.id_veterinaria
              ORDER BY em.fecha DESC`
        );
    },

    async getEmergencyMessagesByVeterinaria(id_veterinaria) {
        return db.all(
            'SELECT * FROM emergency_messages WHERE id_veterinaria = $1 ORDER BY fecha DESC',
            [id_veterinaria]
        );
    },

    async updateMessageStatus(id_mensaje, status) {
        await db.run(
            'UPDATE emergency_messages SET status = $1 WHERE id_mensaje = $2',
            [status, id_mensaje]
        );
        return db.get('SELECT * FROM emergency_messages WHERE id_mensaje = $1', [id_mensaje]);
    }
};
