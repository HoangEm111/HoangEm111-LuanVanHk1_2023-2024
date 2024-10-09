import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/admin.css';
import '../../css/navbar.css';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Hàm để fetch dữ liệu admin
  const fetchAdminData = async () => {
    setLoading(true); // Bắt đầu loading
    setErrorMessage(''); // Reset thông báo lỗi
    try {
      const response = await axios.get('http://localhost:3000/api/admin/admin', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Gửi token trong header
        }
      });
      setAdminData(response.data); // Lưu dữ liệu từ response
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setErrorMessage('Bạn không có quyền truy cập. Vui lòng đăng nhập.');
            break;
          case 403:
            setErrorMessage('Quyền truy cập bị từ chối.');
            break;
          case 404:
            setErrorMessage('Không tìm thấy dữ liệu.');
            break;
          default:
            setErrorMessage(error.response.data.message || 'Đã xảy ra lỗi.');
        }
      } else {
        setErrorMessage('Lỗi trong quá trình tải dữ liệu');
      }
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  useEffect(() => {
    fetchAdminData(); // Gọi hàm khi component được mount
  }, []);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>; // Hiển thị loading nếu đang tải dữ liệu
  }

  if (errorMessage) {
    return (
      <div className="error-message">
        {errorMessage}
        <button onClick={fetchAdminData}>Tải lại</button> {/* Nút tải lại */}
      </div>
    ); // Hiển thị thông báo lỗi nếu có
  }

  return (
    <div className="admin-container">
      <div className="admin-menu">
        <h1>Quản Trị</h1>
        <ul className="menu-links">
          <li><Link to="/admin/products">Sản phẩm</Link></li>
          <li><Link to="/admin/customers">Quản lý khách hàng</Link></li>
          <li><Link to="/admin/orders">Quản lý đơn hàng</Link></li>
        </ul>
      </div>
      <div className="admin-content">
        <h2>Admin Page</h2>
        {adminData ? (
          <div>
            {/* Hiển thị dữ liệu của admin ở đây, ví dụ: */}
            <pre>{JSON.stringify(adminData, null, 2)}</pre>
          </div>
        ) : (
          <div>No data available</div> // Nếu không có dữ liệu
        )}
      </div>
    </div>
  );
};

export default AdminPage;
