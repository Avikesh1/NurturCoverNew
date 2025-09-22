const sql = require("mssql");

// Register new user
exports.registerUser = async (req, res) => {
  const { name, email, username, password, popiAccepted } = req.body;

  // Check required fields including POPI acceptance
  if (!name || !email || !username || !password || popiAccepted !== true) {
    return res.status(400).json({ error: "All fields are required and POPI must be accepted" });
  }

  try {
    let pool = await sql.connect();

    // Check if username already exists
    const existing = await pool.request()
      .input("username", sql.VarChar, username)
      .query("SELECT * FROM LoginDetails WHERE username=@username");

    if (existing.recordset.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Insert user into database, including POPI acceptance
    await pool.request()
      .input("name", sql.VarChar, name)
      .input("email", sql.VarChar, email)
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, password) // ⚠️ Hash later for security
      .input("popiAccepted", sql.Bit, popiAccepted) // New column
      .query("INSERT INTO LoginDetails (username, password, email, name, popiAccepted) VALUES (@username, @password, @email, @name, @popiAccepted)");

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    let pool = await sql.connect();
    const result = await pool.request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, password) // ⚠️ Compare with hash in production
      .query("SELECT * FROM LoginDetails WHERE username=@username AND password=@password");

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful", user: result.recordset[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
