import React from 'react';
import '../css/video.css'; // Đảm bảo CSS đúng đường dẫn

const HomeVideo = () => {
  return (
    <div className="video-container">
      <video autoPlay muted loop className="full-width-video">
        <source src="/video/video_store.mp4" type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ video.
      </video>
    </div>
  );
};

export default HomeVideo;
