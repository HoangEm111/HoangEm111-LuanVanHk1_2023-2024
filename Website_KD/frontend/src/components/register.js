import React, { useState } from 'react';
import axios from 'axios';
import '../css/register.css'; // Đảm bảo bạn đã di chuyển tệp CSS vào thư mục src/

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState(''); // Thêm state để lưu thông báo lỗi

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(''); // Reset thông báo lỗi khi người dùng thay đổi input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', formData);
      alert(response.data.message);
    } catch (error) {
      if (error.response) {
        // Lỗi từ server
        if (error.response.status === 400) {
          // Nếu là lỗi 400, có thể là do email đã tồn tại
          setErrorMessage(error.response.data.message);
        } else {
          alert('Lỗi trong quá trình đăng ký: ' + error.response.data.message);
        }
      } else if (error.request) {
        // Yêu cầu đã được gửi nhưng không có phản hồi
        alert('Không nhận được phản hồi từ server');
      } else {
        // Một lỗi khác
        alert('Lỗi: ' + error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <span className="icon">&#128100;</span>
            <input
              type="text"
              name="username"
              placeholder="User name"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="icon">&#128274;</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="icon">&#128274;</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Hiển thị thông báo lỗi ngay dưới input password */}

          </div>
          <button type="submit" className="login-btn">Register</button>
          <div className="or">or</div>
          <div className="social-login">
            <button className="facebook" type="button">Facebook</button>
            <button className="twitter" type="button">Twitter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
