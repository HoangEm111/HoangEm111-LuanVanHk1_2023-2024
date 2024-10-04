import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../css/productList.css';

const ProductList = () => {
  const listRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const products = [
    { id: 1, name: 'Áo thun', price: 200000, image: 'https://int.bape.com/cdn/shop/files/0ZXSTM131003NBLX-pdp-1.jpg?v=1726666399&width=1200'},
    { id: 2, name: 'Quần jeans', price: 500000, image: 'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXSWM115304NGRX/0ZXSWM115304NGRX-pdp-1.jpg' },
    { id: 3, name: 'Áo khoác', price: 700000, image: 'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXLTM111015NGYX/0ZXLTM111015NGYX-pdp-1.jpg' },
    { id: 4, name: 'Cargo jean', price: 100000000, image: 'https://int.bape.com/cdn/shop/files/0PXJNW250302NBLX-pdp-1.jpg?v=1727433157&width=1200' },
    { id: 5, name: 'Áo thun', price: 200000, image: 'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXTEM110323NWHX/0ZXTEM110323NWHX-pdp-1.jpg' },
    { id: 6, name: 'Quần jeans', price: 500000, image: 'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXSWM115304NGRX/0ZXSWM115304NGRX-pdp-1.jpg' },
    { id: 7, name: 'Áo khoác', price: 700000, image: 'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXLTM111015NGYX/0ZXLTM111015NGYX-pdp-1.jpg' },
    { id: 8, name: 'Cargo jean', price: 100000000, image: 'https://int.bape.com/cdn/shop/files/0PXJNW250302NBLX-pdp-1.jpg?v=1727433157&width=1200' }
  ];

  const extendedProducts = [...products, products[0]];

  const handleMouseDown = (e) => {
    e.preventDefault(); // Ngăn chặn kéo chọn văn bản
    setIsDragging(true);
    setStartX(e.pageX - listRef.current.offsetLeft);
    setScrollLeft(listRef.current.scrollLeft);
    listRef.current.style.cursor = 'grabbing'; // Ẩn con trỏ khi kéo
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    listRef.current.style.cursor = 'grab'; // Đặt lại con trỏ khi rời
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    listRef.current.style.cursor = 'grab'; // Đặt lại con trỏ khi nhả
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return; // Nếu không kéo thì không làm gì cả
    e.preventDefault();
    const x = e.pageX - listRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Tăng tốc độ cuộn
    listRef.current.scrollLeft = scrollLeft - walk; // Cập nhật vị trí cuộn
  };

  const handleClick = (e) => {
    if (isDragging) {
      e.preventDefault(); // Ngăn chặn hành động click nếu đang kéo
    }
  };

  // Lấy chiều rộng của từng sản phẩm
  const productItemWidth = 200; // Chiều rộng của mỗi sản phẩm

  // Hàm cuộn đến sản phẩm trước đó
  const handlePrevClick = () => {
    listRef.current.scrollLeft -= productItemWidth; // Cuộn sang trái
  };

  // Hàm cuộn đến sản phẩm tiếp theo
  const handleNextClick = () => {
    listRef.current.scrollLeft += productItemWidth; // Cuộn sang phải
  };

  return (
    <div className="products-section">
      <button className="arrow prev" onClick={handlePrevClick}>&#10094;</button>
      <div
        className="product-list"
        ref={listRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ display: 'flex', overflowX: 'hidden' }} // Đảm bảo cuộn
      >
        {extendedProducts.map((product, index) => (
  <div key={`${product.id}-${index}`} className="product-item" onClick={handleClick}>
    <Link to={`/products/${product.id}`} className="product-link">
      <img src={product.image} alt={product.name} className="product-image" />
    </Link>
    <div className="product-info-home">
      <Link to={`/products/${product.id}`} className="product-link">
        <h4 className="product-name">{product.name}</h4>
      </Link>
      <p className="product-price-home">{product.price.toLocaleString()} VND</p>
    </div>
  </div>
))}
      </div>
      <button className="arrow next" onClick={handleNextClick}>&#10095;</button>
    </div>
  );
};

export default ProductList;
