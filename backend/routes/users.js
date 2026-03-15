const router = require('express').Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.remove);
router.get('/:id/dashboard', usersController.getDashboard);

module.exports = router;