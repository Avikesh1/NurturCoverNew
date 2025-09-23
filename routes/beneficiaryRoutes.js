const express = require('express');
const router = express.Router();
const controller = require('../controllers/beneficiaryController');

router.post('/', controller.createBeneficiary);
router.get('/:customerId', controller.getBeneficiariesByCustomer);

module.exports = router;
