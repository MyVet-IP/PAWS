const router = require('express').Router();
const { validateBody } = require('../middleware');
const petsController = require('../controllers/petsController');

router.get('/', petsController.getAll);
router.get('/:id', petsController.getById);
router.get('/user/:user_id', petsController.getByUser);
router.post('/', validateBody(['name', 'animal_type_id', 'user_id']), petsController.create);
router.put('/:id', petsController.update);
router.delete('/:id', petsController.remove);

module.exports = router;