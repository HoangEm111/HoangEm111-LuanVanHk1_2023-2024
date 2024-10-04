import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../css/productDetail.css';

const ProductDetail = ({ products, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('M');
  const [notification, setNotification] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null); // Thêm state cho ảnh chính

  // Kiểm tra sản phẩm có tồn tại không
  const product = products.find(p => p.id === Number(id));
  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    const cartProduct = { ...product, size: selectedSize, quantity };
    addToCart(cartProduct);
    showNotification(cartProduct);
  };

  const showNotification = (product) => {
    setNotification(product);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(Number(e.target.value), 1);
    setQuantity(value);
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
  };

  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl); // Cập nhật ảnh chính khi người dùng click vào ảnh thu nhỏ
  };

  return (
    <div className="product-detail">
      <button onClick={() => navigate('/')}>Trở về danh sách</button>
      <div className='product-content'>
        <div className='product-images'>
          <div className='thumbnail-images'>
            {product.thumbnailImages?.length > 0 ? (
              product.thumbnailImages.map((thumb, index) => (
                <img
                  key={index}
                  src={thumb}
                  alt={`thumbnail-${index}`}
                  className="thumbnail"
                  onClick={() => handleThumbnailClick(thumb)} // Gọi hàm khi click
                />
              ))
            ) : (
              <p>Không có ảnh thu nhỏ</p>
            )}
          </div>
          <img
            src={selectedImage || product.image} // Hiển thị ảnh chính
            alt={product.name}
            className="main-image"
          />
        </div>

        <div className='product-info'>
          <h2>{product.name}</h2>
          <p>{product.price.toLocaleString()} VND</p>
          <label htmlFor="size-select">SIZE:</label>
          <select id="size-select" value={selectedSize} onChange={handleSizeChange}>
            {product.sizes?.length > 0 ? (
              product.sizes.map((size, index) => (
                <option key={index} value={size}>{size}</option>
              ))
            ) : (
              <option value="">Không có kích thước</option>
            )}
          </select>

          <div className="quantity-container">
            <label htmlFor="quantity-select">Số lượng:</label>
            <button className='button-quantity' onClick={decreaseQuantity}>-</button>
            <input 
              id="quantity-select" 
              value={quantity} 
              onChange={handleQuantityChange} 
              min="1"
              type="number"
            />
            <button className='button-quantity' onClick={increaseQuantity}>+</button>
          </div>
          <button onClick={handleAddToCart}>Thêm vào giỏ</button>
        </div>
      </div>

      {notification && (
        <div className="notification">
          <img src={notification.image} alt={notification.name} className="notification-img" />
          <div className="notification-info">
            <h3>{notification.name}</h3>
            <p>Kích thước: {notification.size}</p>
            <p>Giá: {notification.price.toLocaleString()} VND</p>
          </div>
          <button className="view-cart-button" onClick={() => navigate('/cart')}>Xem giỏ hàng</button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
