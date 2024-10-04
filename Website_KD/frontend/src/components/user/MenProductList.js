// src/components/user/MenProductList.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/MenProductList.css'

const MenProductList = () => {
    const products = [
      { id: 1, name: 'STA Houndstooth Baby Milo Tee', price: '$129.00', imageUrl: 'https://int.bape.com/cdn/shop/files/0ZXTEMX10007NBKX-pdp-1.jpg?v=1727422985&width=700' },
      { id: 2, name: 'STA Houndstooth College Relaxed Fit Tee', price: '$147.00', imageUrl: 'https://int.bape.com/cdn/shop/files/0ZXSTM131310NBKX-pdp-2.jpg?v=1727422743&width=700' },
      { id: 3, name: 'STA Houndstooth By Bathing Ape Relaxed Fit Tee', price: '$147.00', imageUrl: 'https://int.bape.com/cdn/shop/files/0ZXSTM131009NBGX-pdp-2.jpg?v=1727422725&width=700' },
      { id: 4, name: 'STA Houndstooth Ape Head Tee', price: '$129.00', imageUrl: 'https://int.bape.com/cdn/shop/files/0ZXKNM120002NBKX-pdp-2.jpg?v=1727422444&width=700' },
      // Thêm sản phẩm khác nếu cần
    ];
  
    return (
      <div className="product-page">
        <div className="filter">
          <h3>Filter</h3>
          <div className="filter-section">
            <h4>Gender</h4>
            <label><input type="checkbox" /> Men (440)</label>
            <label><input type="checkbox" /> Unisex (5)</label>
          </div>
          <div className="filter-section">
            <h4>Colour</h4>
            <label><input type="checkbox" /> Beige (60)</label>
            <label><input type="checkbox" /> Black (268)</label>
            <label><input type="checkbox" /> Blue (112)</label>
            <label><input type="checkbox" /> Brown (23)</label>
            {/* Thêm các màu khác nếu cần */}
          </div>
        </div>
  
        <div className="product-list-men">
          <h1>Men</h1>
          {products.map((product) => (
            <div className="product-item-men" key={product.id}>
              <img src={product.imageUrl} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default MenProductList;