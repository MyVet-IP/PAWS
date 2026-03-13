const router = require('express').Router();
const clinicsController = require('../controllers/clinicsController');

router.get('/clinics', clinicsController.getAll);
router.get('/clinics/:id', clinicsController.getById);
router.post('/veterinarias', clinicsController.create);

router.get('/specialties', clinicsController.getAllSpecialties);
router.post('/specialties', clinicsController.createSpecialty);

module.exports = router;
