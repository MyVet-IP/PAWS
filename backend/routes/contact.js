// routes/contact.js
const router = require('express').Router();
const contactController = require('../controllers/contactController');

// POST /api/contact
router.post('/', contactController.sendMessage);

module.exports = router;