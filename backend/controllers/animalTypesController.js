// ─────────────────────────────────────────────
//  controllers/animalTypesController.js
// ─────────────────────────────────────────────
const animalTypesStorage = require('../storage/animalTypesStorage');

exports.getAll = async (req, res, next) => {
    try {
        const types = await animalTypesStorage.getAll();
        res.json(types);
    } catch (err) {
        next(err);
    }
};