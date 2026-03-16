const router = require('express').Router();
const { validateBody } = require('../middleware');
const businessesController = require('../controllers/businessesController');
const appointmentsController = require('../controllers/appointmentsController');

// Catalogs
router.get('/specialties', businessesController.getAllSpecialties);
router.get('/animal-types', businessesController.getAllAnimalTypes);

// CRUD business
router.get('/', businessesController.getAll);
router.get('/user/:user_id', businessesController.getByUser);
router.get('/:id', businessesController.getById);
router.post('/',
    validateBody(['user_id', 'business_type', 'name', 'address']),
    businessesController.create
);
router.put('/:id', businessesController.update);
router.delete('/:id', businessesController.remove);

// Schedules
router.get('/:id/schedule', businessesController.getSchedule);
router.put('/:id/schedule', businessesController.upsertSchedule);

// Specialities
router.post('/:id/specialties', businessesController.addSpecialty);
router.delete('/:id/specialties/:specialty_id', businessesController.removeSpecialty);

// Enterprise meetings
router.get('/:id/appointments', appointmentsController.getByBusiness);

module.exports = router;