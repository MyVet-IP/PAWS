const db = require('../db');

module.exports = {
    async getAllVisitas() {
        return db.all(
            `SELECT v.*, m.nombre AS mascota_nombre, vet.nombre AS veterinaria_nombre
              FROM visitas v
              INNER JOIN mascotas m ON m.id_mascota = v.id_mascota
              INNER JOIN veterinarias vet ON vet.id_veterinaria = v.id_veterinaria
              ORDER BY v.fecha DESC`
        );
    },

    async getVisitaById(id) {
        return db.get(
            `SELECT v.*, m.nombre AS mascota_nombre, vet.nombre AS veterinaria_nombre
              FROM visitas v
              INNER JOIN mascotas m ON m.id_mascota = v.id_mascota
              INNER JOIN veterinarias vet ON vet.id_veterinaria = v.id_veterinaria
              WHERE v.id_visita = $1`,
            [id]
        );
    },

    async getVisitasByMascota(id_mascota) {
        return db.all(
            `SELECT v.*, vet.nombre AS veterinaria_nombre
              FROM visitas v
              INNER JOIN veterinarias vet ON vet.id_veterinaria = v.id_veterinaria
              WHERE v.id_mascota = $1
              ORDER BY v.fecha DESC`,
            [id_mascota]
        );
    },

    async getVisitasByCliente(id_cliente) {
        return db.all(
            `SELECT v.*, m.nombre AS mascota_nombre, vet.nombre AS veterinaria_nombre
              FROM visitas v
              INNER JOIN mascotas m ON m.id_mascota = v.id_mascota
              INNER JOIN veterinarias vet ON vet.id_veterinaria = v.id_veterinaria
              WHERE m.id_cliente = $1
              ORDER BY v.fecha DESC`,
            [id_cliente]
        );
    },

    async createVisita(diagnostico = null, medicamentos = null, chequeos = null, id_mascota, id_veterinaria) {
        const result = await db.get(
            'INSERT INTO visitas (diagnostico, medicamentos, chequeos, id_mascota, id_veterinaria) VALUES ($1, $2, $3, $4, $5) RETURNING id_visita',
            [diagnostico, medicamentos, chequeos, id_mascota, id_veterinaria]
        );
        return this.getVisitaById(result.id_visita);
    }
};
