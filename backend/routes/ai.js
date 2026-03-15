const router = require('express').Router();
const aiController = require('../controllers/aiController');

router.post('/recommend-clinic',   aiController.recommendClinic);
router.post('/pet-symptom-triage', aiController.petSymptomTriage);
router.post('/care-tips',          aiController.careTips);

module.exports = router;