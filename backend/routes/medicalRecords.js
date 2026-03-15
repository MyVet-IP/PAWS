const router = require('express').Router();
const { validateBody } = require('../middleware');
const medicalRecordsController = require('../controllers/medicalRecordsController');

router.get('/', medicalRecordsController.getAll);
router.get('/pet/:pet_id', medicalRecordsController.getByPet);
router.get('/user/:user_id', medicalRecordsController.getByUser);
router.get('/:id', medicalRecordsController.getById);
router.post('/',
    validateBody(['pet_id', 'user_id', 'visit_type']),
    medicalRecordsController.create
);
router.put('/:id', medicalRecordsController.update);
router.delete('/:id', medicalRecordsController.remove);

module.exports = router;