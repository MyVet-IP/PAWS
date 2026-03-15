const router = require('express').Router();
const { authenticateToken } = require('../middleware/auth');
const appointmentsController = require('../controllers/appointmentsController');

router.get('/', appointmentsController.getAll);
router.get('/:id', appointmentsController.getById);
router.post('/', appointmentsController.create);
router.put('/:id', appointmentsController.update);
router.put('/:id/status', appointmentsController.updateStatus);
router.delete('/:id', authenticateToken, appointmentsController.remove);

module.exports = router;