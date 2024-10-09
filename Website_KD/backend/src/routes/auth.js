const express = require('express');
const router = express.Router();
const { register, login } = require('../app/controller/accountController');

// Hàm tiện ích để thực hiện truy vấn
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
// Tạo transporter cho nodemailer
// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//       user: 'your_email@gmail.com',
//       pass: 'your_email_password',
//     },
//   });
  

// Đăng ký người dùng mới
router.post('/register', register);

// Đăng nhập người dùng
router.post('/login', login);

module.exports = router;
