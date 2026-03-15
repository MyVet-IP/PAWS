const router = require('express').Router();
const { validateBody } = require('../middleware');
const { authenticateToken } = require('../middleware/auth');
const medicalRecordsController = require('../controllers/medicalRecordsController');

router.get('/pet/:pet_id', medicalRecordsController.getByPet);
router.get('/user/:user_id', medicalRecordsController.getByUser);
router.get('/', medicalRecordsController.getAll);
router.get('/:id', medicalRecordsController.getById);
router.post('/', authenticateToken, validateBody(['pet_id', 'user_id', 'visit_type']), medicalRecordsController.create);
router.put('/:id', authenticateToken, medicalRecordsController.update);
router.delete('/:id', authenticateToken, medicalRecordsController.remove);

module.exports = router;