// ─────────────────────────────────────────────
//  storage/animalTypesStorage.js
// ─────────────────────────────────────────────
const db = require('../db');

module.exports = {
    async getAll() {
        return db.all(
            'SELECT * FROM animal_types ORDER BY animal_type_id ASC'
        );
    },
};