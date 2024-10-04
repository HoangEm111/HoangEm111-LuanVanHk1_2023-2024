import React, { useState } from 'react';
import '../css/register.css';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp');
      return;
    }
    // Xử lý đăng ký ở đây
    console.log('Đăng ký với:', { email, password });
  };

  return (
    <div>
      <h2>Đăng ký</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Xác nhận mật khẩu:</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
};

export default Register;
