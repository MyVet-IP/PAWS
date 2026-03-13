const router = require('express').Router();
const authController = require('../controllers/authController');

// rutas de autenticacion
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
