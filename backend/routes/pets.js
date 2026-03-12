const router = require('express').Router();
const petsController = require('../controllers/petsController');

router.get('/mascotas', petsController.getAll);
router.post('/mascotas', petsController.create);
router.get('/pets/:id', petsController.getById);
router.put('/pets/:id', petsController.update);

module.exports = router;
