const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

router.post('/login', auth.login);
router.post('/refresh', auth.refresh);
router.post('/logout', auth.logout);
router.get('/me', authenticateToken, auth.me);

module.exports = router;
