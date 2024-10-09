const db = require('../config/db'); // Đảm bảo đường dẫn đúng
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Hàm tiện ích để thực hiện truy vấn
const query = async (sql, params) => {
  const [results] = await db.query(sql, params);
  return results;
};

// Đăng ký người dùng mới
const register = async (req, res) => {
  const { username, email, password, role = 'user' } = req.body;

  try {
    // Kiểm tra xem người dùng đã tồn tại
    const userExists = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (userExists.length > 0) {
      return res.status(400).json({ message: 'Người dùng đã tồn tại' });
    }

    // Kiểm tra độ dài password
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự.' });
    }

    // Băm mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo người dùng mới
    await query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', 
      [username, email, hashedPassword, role]);

    res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (error) {
    console.error('Đã xảy ra lỗi: ', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
};

// Đăng nhập người dùng
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(400).json({ message: 'Thông tin đăng nhập không hợp lệ' });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: 'Thông tin đăng nhập không hợp lệ' });
    }

    // Tạo JWT token bao gồm role
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message: 'Đăng nhập thành công', token, role: user.role });
  } catch (error) {
    console.error('Đã xảy ra lỗi: ', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
};

module.exports = { register, login };
