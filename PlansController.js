// controllers/planController.js
const db = require("../db");

exports.createPlan = (req, res) => {
  const { customer_id, plan_selected, inception_date, next_reward_date } = req.body;
  const sql = "INSERT INTO Plans (customer_id, plan_selected, inception_date, next_reward_date) VALUES (?, ?, ?, ?)";
  db.query(sql, [customer_id, plan_selected, inception_date, next_reward_date], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Plan created", plan_id: result.insertId });
  });
};

exports.getPlanByCustomer = (req, res) => {
  db.query("SELECT * FROM Plans WHERE customer_id=?", [req.params.customerId], (err, row) => {
    if (err) return res.status(500).json({ error: err });
    res.json(row[0]);
  });
};
