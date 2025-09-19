// controllers/beneficiaryController.js
const db = require("../db");

exports.createBeneficiary = (req, res) => {
  const { customer_id, name, surname, id_number } = req.body;
  const sql = "INSERT INTO Beneficiaries (customer_id, name, surname, id_number) VALUES (?, ?, ?, ?)";
  db.query(sql, [customer_id, name, surname, id_number], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Beneficiary added", beneficiary_id: result.insertId });
  });
};

exports.getBeneficiariesByCustomer = (req, res) => {
  db.query("SELECT * FROM Beneficiaries WHERE customer_id=?", [req.params.customerId], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};
