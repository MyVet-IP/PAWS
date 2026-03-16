const path = require('path');
const fs = require('fs');
const multer = require('multer');
const router = require('express').Router();
const { validateBody } = require('../middleware');
const businessesController = require('../controllers/businessesController');
const appointmentsController = require('../controllers/appointmentsController');

// Multer config for clinic images
const uploadDir = path.join(__dirname, '..', '..', 'uploads', 'businesses');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `biz-${req.params.id}-${Date.now()}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    cb(null, allowed.includes(file.mimetype));
  }
});

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

// Image upload
router.post('/:id/image', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image file provided' });
    const image_url = `/uploads/businesses/${req.file.filename}`;
    const businessesStorage = require('../storage/businessesStorage');
    const updated = await businessesStorage.update(req.params.id, { image_url });
    res.json(updated);
  } catch (err) { next(err); }
});

// Schedules
router.get('/:id/schedule', businessesController.getSchedule);
router.put('/:id/schedule', businessesController.upsertSchedule);

// Specialities
router.post('/:id/specialties', businessesController.addSpecialty);
router.delete('/:id/specialties/:specialty_id', businessesController.removeSpecialty);

// Enterprise meetings
router.get('/:id/appointments', appointmentsController.getByBusiness);

module.exports = router;