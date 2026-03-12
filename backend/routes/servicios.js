const router = require('express').Router();
const { validateBody } = require('../middleware');
const serviciosController = require('../controllers/serviciosController');

router.get('/', serviciosController.getAll);
router.get('/:id', serviciosController.getById);
router.post('/', validateBody(['name']), serviciosController.create);

module.exports = router;
