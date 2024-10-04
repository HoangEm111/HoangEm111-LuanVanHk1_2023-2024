import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../../css/navbar.css';

const Navbar = ({ cartCount }) => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart'); // Điều hướng đến trang giỏ hàng
  };

  // Hook để thêm sự kiện cuộn khi component được mount
  useEffect(() => {
    let lastScrollTop = 0;
    const navbar = document.querySelector("nav");

    const handleScroll = () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // Cuộn xuống thì ẩn navbar
        navbar.style.top = "-80px";
      } else {
        // Cuộn lên thì hiện navbar
        navbar.style.top = "0";
      }
      lastScrollTop = scrollTop;
    };

    // Thêm sự kiện cuộn
    window.addEventListener("scroll", handleScroll);

    // Cleanup sự kiện khi component bị unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Mảng rỗng để chỉ chạy một lần khi component mount

  return (
    <nav>
      <div className="logo">
        {/* Sử dụng thẻ img để hiển thị logo */}
        <img 
          src="/img/heat_factory_logo_941df211-8a02-4325-ba30-62c2e83a4da1_210x-removebg-preview.png" 
          alt="Logo"
          className="logo-img"
        />
      </div>
      <ul>
        <li><a href="/">Trang Chủ</a></li>
        <li><a href="/login">Đăng Nhập</a></li>
        <li><a href="/register">Đăng Ký</a></li>
        <li><a href="/products">Sản Phẩm</a></li>
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
