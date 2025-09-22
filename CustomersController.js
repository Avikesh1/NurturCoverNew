// controllers/customerController.js
const db = require("/NurturCover");

// Create customer
exports.createCustomer = (req, res) => {
  const { name, surname, id_number, popi_consent } = req.body;
  const sql = "INSERT INTO Customer (name, surname, id_number, popi_consent) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, surname, id_number, popi_consent], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Customer created", customer_id: result.insertId });
  });
};

// Get all customers
exports.getCustomers = (req, res) => {
  db.query("SELECT * FROM Customer", (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};

// Get single customer
exports.getCustomerById = (req, res) => {
  db.query("SELECT * FROM Customer WHERE customer_id = ?", [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows[0]);
  });
};

// Update customer
exports.updateCustomer = (req, res) => {
  const { name, surname, id_number, popi_consent } = req.body;
  db.query(
    "UPDATE Customer SET name=?, surname=?, id_number=?, popi_consent=? WHERE customer_id=?",
    [name, surname, id_number, popi_consent, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Customer updated" });
    }
  );
};

// Delete customer
exports.deleteCustomer = (req, res) => {
  db.query("DELETE FROM Customer WHERE customer_id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Customer deleted" });
  });
};
