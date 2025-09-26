const mysql = require("mysql");

// DB credentials
const hostname = "7ba4ns.h.filess.io";
const database = "NurturCover_shoulderit";
const port = 3306;
const username = "NurturCover_shoulderit";
const password = "3a4aff25ab51620794cf7ab46028ca997a689b88";

// create connection
const db = mysql.createConnection({
  host: hostname,
  user: username,
  password,
  database,
  port,
});

// function to connect once at startup
function connectDB() {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if (err) {
        console.error("❌ Database connection failed:", err);
        reject(err);
      } else {
        console.log("✅ Connected to MySQL!");
        resolve();
      }
    });
  });
}

module.exports = { connectDB, db };
