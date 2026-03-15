const path = require('path');
const multer = require('multer');
const router = require('express').Router();
const { validateBody } = require('../middleware');
const medicalRecordsController = require('../controllers/medicalRecordsController');

// Multer — stores files temporarily in /tmp while processing
const upload = multer({
    dest: require('os').tmpdir(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
    fileFilter: (req, file, cb) => {
        const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only PNG, JPG and PDF files are accepted.'));
        }
    }
});

// ── Extract fields from a document ──────────────────────────────
router.post('/extract', upload.single('file'), medicalRecordsController.extract);

// ── CRUD ──────────────────────────────────────────────────────────────────────
router.get('/', medicalRecordsController.getAll);
router.get('/:id', medicalRecordsController.getById);
router.get('/pet/:pet_id', medicalRecordsController.getByPet);
router.get('/user/:user_id', medicalRecordsController.getByUser);
router.post('/', upload.single('file'), medicalRecordsController.create);
router.put('/:id', medicalRecordsController.update);
router.delete('/:id', medicalRecordsController.remove);

module.exports = router;