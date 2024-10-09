import React, { useEffect, useState } from 'react';
import '../css/video.css'; // Đảm bảo CSS đúng đường dẫn

const HomeVideo = () => {
  const [isLoaded, setIsLoaded] = useState(false); // Trạng thái để kiểm tra video đã tải chưa

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true); // Đặt trạng thái isLoaded thành true khi video đã tải
    };

    const videoElement = document.querySelector('.full-width-video');
    videoElement.addEventListener('loadeddata', handleLoad); // Lắng nghe sự kiện video đã tải

    return () => {
      videoElement.removeEventListener('loadeddata', handleLoad); // Cleanup sự kiện khi component unmount
    };
  }, []);

  return (
    <div className="video-container">
      <video autoPlay muted loop className={`full-width-video ${isLoaded ? 'fade-in' : ''}`}>
        <source src="/video/video_store.mp4" type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ video.
      </video>
    </div>
  );
};

export default HomeVideo;
