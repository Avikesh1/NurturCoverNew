const mysql = require('mysql2/promise');

// create the connection pool
const db = mysql.createPool({
  host: '7ba4ns.h.filess.io',
  user: 'NurturCover_shoulderit',
  password: '3a4aff25ab51620794cf7ab46028ca997a689b88',
  database: 'NurturCover_shoulderit',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// optional connect function
async function connectDB() {
  try {
    const conn = await db.getConnection();
    console.log('✅ MySQL connected');
    conn.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    throw err;
  }
}

module.exports = { connectDB, db };
