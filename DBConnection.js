// DBConnection.js
const sql = require("mssql");

const dbConfig = {
  user: "sa",                // your SQL Server username
  password: "0096",          // your SQL Server password
  server: "localhost",       // server host
  database: "NurturCover",   // your database name
  options: {
    encrypt: false,
    trustServerCertificate: true,
    instanceName: "SQLEXPRESS01", // ✅ match your server.js
  },
};

// Create a connection pool
const pool = new sql.ConnectionPool(dbConfig);

const connectDB = async () => {
  try {
    await pool.connect();
    console.log("✅ SQL Server connected");
    return pool;
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    throw err;
  }
};

module.exports = { sql, pool, connectDB };
