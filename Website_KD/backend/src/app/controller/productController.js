const db = require('../config/db');


// Hàm thêm sản phẩm vào CSDL
const addProduct =async (req, res) => {
  const { name, price, image, description, quantity, sizes, category_id } = req.body;

  // Kiểm tra các trường bắt buộc
  if (!name || !price || !image || !quantity || !sizes || !category_id) {
      return res.status(400).json({ message: 'Missing required fields' });
  }

  const sizesJson = JSON.stringify(Array.isArray(sizes) ? sizes : [sizes]); // sizes là mảng


  // Câu lệnh SQL để thêm sản phẩm
  const sql = 'INSERT INTO products (name, price, image, description, category_id, quantity, sizes) VALUES (?, ?, ?, ?, ?, ?, ?)';

  try {
    const [result] = await db.query(sql, [name, price, image, description, category_id, quantity, sizesJson]);
    res.status(201).json({ message: 'Product added successfully', result });
  } catch (err) {
    console.error('Error inserting product: ', err);
    res.status(500).json({ message: 'Failed to add product', error: err.message });
  }
};

module.exports = { addProduct };
