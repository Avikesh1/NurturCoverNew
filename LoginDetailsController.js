// controllers/loginController.js
const db = require("../db");
const bcrypt = require("bcrypt");

// Register login
exports.createLogin = async (req, res) => {
  const { customer_id, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO LoginDetails (customer_id, username, password) VALUES (?, ?, ?)";
  db.query(sql, [customer_id, username, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Login created", login_id: result.insertId });
  });
};

// Authenticate login
exports.login = (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM LoginDetails WHERE username=?", [username], async (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (rows.length === 0) return res.status(401).json({ error: "Invalid username or password" });

    const valid = await bcrypt.compare(password, rows[0].password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful", customer_id: rows[0].customer_id });
  });
};
