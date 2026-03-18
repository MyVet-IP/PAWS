const multer = require('multer');
const router = require('express').Router();
const usersController = require('../controllers/usersController');
const appointmentsController = require('../controllers/appointmentsController');
const { uploadImage } = require('../services/blobStorageService');

const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 5 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
		cb(null, allowed.includes(file.mimetype));
	}
});

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.put('/:id', usersController.update);
router.post('/:id/photo', upload.single('photo'), async (req, res, next) => {
	try {
		if (!req.file) return res.status(400).json({ error: 'No image file provided' });

		const photo_url = await uploadImage({
			file: req.file,
			folder: 'users',
			prefix: `user-${req.params.id}`
		});

		req.body.photo_url = photo_url;
		return usersController.uploadPhoto(req, res, next);
	} catch (err) {
		next(err);
	}
});
router.delete('/:id', usersController.remove);
router.get('/:id/dashboard', usersController.getDashboard);
router.get('/:id/appointments', appointmentsController.getByUser);

module.exports = router;