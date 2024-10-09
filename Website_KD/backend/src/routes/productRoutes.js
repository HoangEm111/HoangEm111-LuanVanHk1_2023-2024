const express = require('express');
const { addProduct } = require('../app/controller/productController');
const router = express.Router();

// Route POST để thêm sản phẩm
router.post('/add', addProduct);

module.exports = router;
