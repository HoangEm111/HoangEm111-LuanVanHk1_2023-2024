const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken'); // Đường dẫn đến file middleware

// Route admin
router.get('/admin', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Quyền truy cập bị từ chối' }); // Nếu không phải admin, trả về 403
  }
  res.json({ message: 'Chào mừng đến trang admin!' }); // Trả về thông điệp cho admin
});

module.exports = router;
