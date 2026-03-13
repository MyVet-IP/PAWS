const router = require('express').Router();
const usersController = require('../controllers/usersController');

router.get('/:id/dashboard', usersController.getDashboard);

module.exports = router;
