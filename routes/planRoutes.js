const express = require('express');
const router = express.Router();
const controller = require('../controllers/planController');

router.post('/', controller.createPlan);
router.get('/', controller.getPlans);

module.exports = router;
