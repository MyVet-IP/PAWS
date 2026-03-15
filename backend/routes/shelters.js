const router = require('express').Router();
const sheltersController = require('../controllers/sheltersController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', sheltersController.getAll);
router.get('/:id/pets', sheltersController.getPets);
router.post('/adoptions', authenticateToken, sheltersController.createAdoption);

module.exports = router;