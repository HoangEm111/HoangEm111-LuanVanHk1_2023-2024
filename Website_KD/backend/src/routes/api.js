// File: routes/api.js
const express = require('express');
const router = express.Router();

// Định nghĩa endpoint /api/register
router.post('/register', (req, res) => {
  // Xử lý yêu cầu đăng ký
  res.status(200).send('Đăng ký thành công');
});

module.exports = router;
