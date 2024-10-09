import React from 'react';
import '../../css/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>Khám phá</h4>
        <ul>
          <li>Đàn ông</li>
          <li>Phụ nữ</li>
          <li>Trẻ em</li>
          <li>Tin tức</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>CHĂM SÓC KHÁCH HÀNG</h4>
        <ul>
          <li>Liên hệ với chúng tôi</li>
          <li>Vận chuyển</li>
          <li>Chính sách trả hàng</li>
          <li>Chính sách bảo mật</li>
          <li>Chính sách Cookie</li>
          <li>Điều khoản & Điều kiện</li>
        </ul>
      </div>
      <div className="footer-social">
        <a href="#"><img src="path/to/facebook-icon.png" alt="Facebook" /></a>
        <a href="#"><img src="path/to/instagram-icon.png" alt="Instagram" /></a>
        <a href="#"><img src="path/to/twitter-icon.png" alt="Twitter" /></a>
        <a href="#"><img src="path/to/youtube-icon.png" alt="YouTube" /></a>
      </div>
      <div className="footer-bottom">
        <ul>
            <li>Chính sách hoàn tiền</li>
            <li>Chính sách bảo mật</li>
            <li>Chính sách vận chuyển</li>
            <li>Điều khoản dịch vụ</li>
        </ul>
        <p>© 2024 BAPE Hong Kong Limited</p>
      </div>
    </footer>
  );
};

export default Footer;
