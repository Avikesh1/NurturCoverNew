const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");

router.post("/", planController.createPlan);
router.get("/:customerId", planController.getPlanByCustomer);

module.exports = router;
