// PromotionBanner.js
import React from 'react';
import '../../css/PromotionBanner.css'; // Đảm bảo đã tạo file CSS

const PromotionBanner = ({ message }) => {
  return (
    <div className="promotion-banner">
      {message}
    </div>
  );
};

export default PromotionBanner;
