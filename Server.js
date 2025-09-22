const express = require("express");
const sql = require("mssql");

// Import routes
const customerRoutes = require("./routes/customerRoutes");
const beneficiaryRoutes = require("./routes/beneficiaryRoutes");
const planRoutes = require("./routes/planRoutes");
const authRoutes = require("./routes/authRoutes"); // 🔄 replaces loginRoutes

const app = express();
app.use(express.json()); // ✅ no need for body-parser in modern Express

// Database config
const dbConfig = {
  user: "sa",
  password: "your_password", // 🔒 update with your real password
  server: "localhost\\SQLEXPRESS01",
  database: "NurturCover",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// Connect to SQL Server
sql.connect(dbConfig)
  .then(() => console.log("✅ Connected to SQL Server"))
  .catch((err) => console.error("❌ DB Connection Failed:", err));

// Routes
app.use("/api/customers", customerRoutes);
app.use("/api/beneficiaries", beneficiaryRoutes);
app.use("/api/plans", planRoutes);
app.use("/api", authRoutes); // 🔄 handles /register and /login

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
