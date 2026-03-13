const router = require('express').Router();
const { validateBody } = require('../middleware');
const emergenciesController = require('../controllers/emergenciesController');

router.get('/', emergenciesController.getAll);
router.get('/messages', emergenciesController.getAllMessages);
router.get('/:id', emergenciesController.getById);
router.post('/',
    validateBody(['pet_id', 'business_id', 'description']),
    emergenciesController.create
);
router.patch('/:id/status', emergenciesController.updateStatus);
router.post('/messages',
    validateBody(['business_id', 'message', 'contact_name']),
    emergenciesController.sendMessage
);

module.exports = router;