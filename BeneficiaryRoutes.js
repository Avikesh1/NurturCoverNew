const express = require("express");
const router = express.Router();
const beneficiaryController = require("../controllers/beneficiaryController");

router.post("/", beneficiaryController.createBeneficiary);
router.get("/:customerId", beneficiaryController.getBeneficiariesByCustomer);

module.exports = router;
