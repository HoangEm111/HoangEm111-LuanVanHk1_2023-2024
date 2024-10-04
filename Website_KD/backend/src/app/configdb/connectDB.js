const mysql = require('mysql2');

// Tạo kết nối đến MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Tên đăng nhập MySQL
  password: '1501',
  database: 'nike' // Tên cơ sở dữ liệu bạn đã tạo
});

// Kiểm tra kết nối
connection.connect((err) => {
  if (err) {
    console.error('Kết nối thất bại: ' + err.stack);
    return;
  }
  console.log('Kết nối thành công với ID ' + connection.threadId);
});

module.exports = connection;