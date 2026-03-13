const router = require('express').Router();
const visitsController = require('../controllers/visitsController');

router.get('/visitas', visitsController.getAll);
router.get('/visitas/mascota/:id', visitsController.getByPet);
router.post('/visitas', visitsController.create);

router.post('/appointments', visitsController.createAppointment);

module.exports = router;
