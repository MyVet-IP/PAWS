const express = require('express');
const router = express.Router();
const { getClinics, getClinicById } = require('../controllers/clinicsController');