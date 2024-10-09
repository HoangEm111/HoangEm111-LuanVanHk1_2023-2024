const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Truy cập bị từ chối' });
  }

  try {
    const verified = jwt.verify(token.replace('Bearer ', ''), 'jwt_secret'); // Thay 'jwt_secret' bằng secret của bạn
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token không hợp lệ' });
  }
};

module.exports = verifyToken;
