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
  user: "NurturCover_shoulderit",
  password: "3a4aff25ab51620794cf7ab46028ca997a689b88", // 🔒 update with your real password
  server: "localhost",
  database: "NurturCover_shoulderit",
  options: {
    encrypt: false,
    trustServerCertificate: true,
    instanceName: "mysql://NurturCover_shoulderit:3a4aff25ab51620794cf7ab46028ca997a689b88@7ba4ns.h.filess.io:3306/NurturCover_shoulderit"  // ✅ this is the key update
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
