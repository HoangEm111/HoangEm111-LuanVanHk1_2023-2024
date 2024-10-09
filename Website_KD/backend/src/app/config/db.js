const mysql = require('mysql2/promise');
require('dotenv').config();

// Tạo kết nối đến MySQL
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1501',
  database: process.env.DB_NAME || 'nike',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;
