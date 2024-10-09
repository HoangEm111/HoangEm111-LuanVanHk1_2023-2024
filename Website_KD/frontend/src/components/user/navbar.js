import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/navbar.css';

const Navbar = ({ cartCount, isLoggedIn, setIsLoggedIn, role }) => {
  const [showLogoutMenu, setShowLogoutMenu] = useState(false); // Trạng thái để hiển thị menu đăng xuất
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart'); // Điều hướng đến trang giỏ hàng
  };

  const handleLogout = () => {
    // Xóa token hoặc thông tin đăng nhập
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất không?')) {
      localStorage.removeItem('token'); 
      setIsLoggedIn(false);// Cập nhật trạng thái đăng nhập
      navigate('/login');// Chuyển hướng đến trang đăng nhập
    }
  };

  useEffect(() => {
    let lastScrollTop = 0;
    const navbar = document.querySelector("nav");

    const handleScroll = () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        navbar.style.top = "-80px";
      } else {
        navbar.style.top = "0";
      }
      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <img 
          src="/img/heat_factory_logo_941df211-8a02-4325-ba30-62c2e83a4da1_210x-removebg-preview.png" 
          alt="Logo"
          className="logo-img"
        />
      </div>
      <ul className="nav-links">
        <li><Link to="/">Trang Chủ</Link></li>
    
        <li><Link to="/products">Sản Phẩm</Link></li>
        {!isLoggedIn ?(
        <li><Link to="/login">Đăng Nhập</Link></li>

        ) :  (
        <li className="nav-item"
            onMouseEnter={() => setShowLogoutMenu(true)} // Hiển thị menu khi hover
            onMouseLeave={() => setShowLogoutMenu(false)} // Ẩn menu khi rời khỏi icon
          >
            <span className="nav-icon">&#128100;</span> {/* Icon khách hàng */}
            {role === 'admin' &&(
                    <Link to="/admin" className="admin-link">Admin</Link> // Hiển thị cho admin
            )}
            {showLogoutMenu && (
              <div className="logout-menu">
                <button onClick={handleLogout}>Đăng xuất</button> {/* Nút đăng xuất */}
              </div>
            )}
          </li>
        )}
       
      </ul>
      <div className="cart" onClick={handleCartClick}>
        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
        {cartCount > 0 && (
          <div className="cart-count">{cartCount}</div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
