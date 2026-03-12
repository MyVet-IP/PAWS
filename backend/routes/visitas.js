const router = require('express').Router();
const { validateBody } = require('../middleware');
const visitasController = require('../controllers/visitasController');

router.get('/', visitasController.getAll);
router.get('/:id', visitasController.getById);
router.get('/mascota/:id_mascota', visitasController.getByMascota);
router.post('/', validateBody(['id_mascota', 'id_veterinaria']), visitasController.create);

module.exports = router;
