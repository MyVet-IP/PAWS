const veterinariasStorage = require('./veterinariasStorage');

module.exports = {
    async getAllServicios() {
        return veterinariasStorage.getAllSpecialties();
    },

    async getServicioById(id) {
        return veterinariasStorage.getSpecialtyById(id);
    },

    async createServicio(name) {
        return veterinariasStorage.createSpecialty(name);
    },

    async getServiciosByVeterinaria(id_veterinaria) {
        return veterinariasStorage.getSpecialtiesByVeterinaria(id_veterinaria);
    }
};
