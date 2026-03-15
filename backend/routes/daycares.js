const router = require('express').Router();
const daycaresController = require('../controllers/daycaresController');
const { authenticateToken } = require('../middleware/auth');

router.get('/:id/slots', daycaresController.getSlots);
router.post('/bookings', authenticateToken, daycaresController.createBooking);
router.get('/bookings', authenticateToken, daycaresController.getBookingsByUser);

module.exports = router;