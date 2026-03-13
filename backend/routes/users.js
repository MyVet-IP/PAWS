const router = require('express').Router();
const usersController = require('../controllers/usersController');

// dashboard del usuario con sus mascotas y visitas
router.get('/:id/dashboard', usersController.getDashboard);

module.exports = router;
