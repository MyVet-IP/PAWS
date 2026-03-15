const router = require('express').Router();
const { validateBody } = require('../middleware');
const { authenticateToken } = require('../middleware/auth');
const petsController = require('../controllers/petsController');

router.get('/', petsController.getAll);
router.get('/user/:user_id', petsController.getByUser);
router.get('/:id', petsController.getById);
router.post('/', authenticateToken, validateBody(['name', 'animal_type_id', 'user_id']), petsController.create);
router.put('/:id', authenticateToken, petsController.update);
router.delete('/:id', authenticateToken, petsController.remove);

module.exports = router;