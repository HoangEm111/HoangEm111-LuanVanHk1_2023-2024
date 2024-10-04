import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './css/app.css'; // Import file CSS cho giao diện

// Khởi tạo root của React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Hiển thị component App vào root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
