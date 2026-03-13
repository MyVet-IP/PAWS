const router = require('express').Router();
const { validateBody } = require('../middleware');
const businessesController = require('../controllers/businessesController');

// Catálogos
router.get('/specialties', businessesController.getAllSpecialties);
router.get('/animal-types', businessesController.getAllAnimalTypes);

// CRUD negocios
router.get('/', businessesController.getAll);
router.get('/:id', businessesController.getById);
router.post('/',
    validateBody(['user_id', 'business_type', 'name', 'address']),
    businessesController.create
);
router.put('/:id', businessesController.update);

// Horarios
router.get('/:id/schedule', businessesController.getSchedule);

module.exports = router;