const router = require('express').Router();
const clientesController = require('../controllers/clientesController');

router.get('/', clientesController.getAll);
router.get('/:id', clientesController.getById);
router.get('/:id/dashboard', clientesController.getDashboard);
router.put('/:id', clientesController.update);

module.exports = router;
