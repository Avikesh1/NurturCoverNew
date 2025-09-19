const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",   // or your hosting service
  user: "root",        // your MySQL username
  password: "password",// your MySQL password
  database: "NurturCover"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL connected");
});

module.exports = db;
