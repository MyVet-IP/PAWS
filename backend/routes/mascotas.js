const router = require('express').Router();
const { validateBody } = require('../middleware');
const mascotasController = require('../controllers/mascotasController');

router.get('/', mascotasController.getAll);
router.get('/:id', mascotasController.getById);
router.get('/cliente/:id_cliente', mascotasController.getByCliente);
router.post('/', validateBody(['nombre', 'especie', 'id_cliente']), mascotasController.create);
router.put('/:id', mascotasController.update);
router.delete('/:id', mascotasController.remove);

module.exports = router;
