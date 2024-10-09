import React, { useState, useRef, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../../css/login.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const passwordRef = useRef(null); 
  const navigate = useNavigate(); 
 
  const removeFocus = () => {
    if (passwordRef.current) {
      passwordRef.current.blur(); 
    }
  };

  // Kiểm tra token khi component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/'); // Redirect tới trang chủ nếu người dùng đã đăng nhập
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Bắt đầu loading
    setErrorMessage(''); // Reset thông báo lỗi
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: username, 
        password: password,
      });
      const userRole = response.data.role; // Giả sử role được trả về từ server
      // Lưu token và vai trò của người dùng
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', userRole); // Lưu vai trò vào local storage

      // Kiểm tra vai trò và điều hướng
      if (userRole === 'admin') {
        navigate('/admin'); // Chuyển đến trang admin nếu là admin
      } else {
        navigate('/'); // Chuyển đến trang chính nếu không phải admin
      }
      window.location.reload();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage(error.response.data.message);
        } else {
          alert('Lỗi trong quá trình đăng nhập: ' + error.response.data.message);
        }
      } else if (error.request) {
        alert('Không nhận được phản hồi từ server');
      } else {
        alert('Lỗi: ' + error.message);
      }
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };
  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setRole(role);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Classy Login Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <span className="icon">&#128100;</span>
            <input
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <span className="icon">&#128274;</span>
            <input
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ref={passwordRef}
              required
            />
            <span
              className="icon-password"
              onClick={() => {
                setShowPassword(!showPassword);
                removeFocus(); 
              }}
            >
              {showPassword ? '👁️' : '🙈'} 
            </span>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
          <div className="or">or</div>
          <div className="social-login">
            <button className="facebook" type="button">Facebook</button>
            <button className="twitter" type="button">Twitter</button>
          </div>
          <div className="register-link">
            <button type="button" onClick={() => navigate('/register')}>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
