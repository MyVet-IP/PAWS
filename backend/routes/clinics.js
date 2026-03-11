const router = require('express').Router();
const clinicsController = require('../controllers/clinicsController');

// rutas de clinicas veterinarias
router.get('/clinics', clinicsController.getAll);
router.get('/clinics/:id', clinicsController.getById);
router.post('/veterinarias', clinicsController.create);

// rutas de especialidades
router.get('/specialties', clinicsController.getAllSpecialties);
router.post('/specialties', clinicsController.createSpecialty);

module.exports = router;
