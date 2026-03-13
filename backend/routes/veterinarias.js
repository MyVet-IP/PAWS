const router = require('express').Router();
const { validateBody } = require('../middleware');
const veterinariasController = require('../controllers/veterinariasController');

router.get('/', veterinariasController.getAll);
router.get('/:id', veterinariasController.getById);
router.post('/', validateBody(['nombre', 'direccion']), veterinariasController.create);
router.get('/:id/schedules', veterinariasController.getSchedules);

module.exports = router;
