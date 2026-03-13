const router = require('express').Router();
const clientsController = require('../controllers/clientsController');

router.get('/', clientsController.getAll);
router.get('/:id', clientsController.getById);
router.post('/', clientsController.create);
router.put('/:id', clientsController.update);

module.exports = router;
