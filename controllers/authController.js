const { sql, connectDB } = require('../DBConnection');

// VERY basic auth handlers - replace with hashed passwords & JWT in production
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const pool = await connectDB();
    await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, password)
      .query('INSERT INTO LoginDetails (username, password) VALUES (@username,@password)');
    res.status(201).json({ message: 'Registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const pool = await connectDB();
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, password)
      .query('SELECT * FROM LoginDetails WHERE username=@username AND password=@password');
    if (result.recordset.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ message: 'Login successful', user: result.recordset[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
