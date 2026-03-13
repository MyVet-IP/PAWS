const router = require('express').Router();
const { validateBody } = require('../middleware');
const emergenciesController = require('../controllers/emergenciesController');

router.get('/emergency-messages', emergenciesController.getAllMessages);

router.post('/emergency', validateBody(['mensaje', 'nombre_contacto', 'id_veterinaria']), emergenciesController.sendMessage);

router.get('/emergencias', emergenciesController.getAll);
router.post('/emergencias', emergenciesController.create);

module.exports = router;
