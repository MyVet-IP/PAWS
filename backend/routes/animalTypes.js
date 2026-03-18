// ─────────────────────────────────────────────
//  routes/animalTypes.js
// ─────────────────────────────────────────────
const router = require('express').Router();
const animalTypesController = require('../controllers/animalTypesController');

// GET /api/animal-types
router.get('/', animalTypesController.getAll);

module.exports = router;