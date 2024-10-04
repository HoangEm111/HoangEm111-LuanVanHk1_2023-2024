// src/components/user/MenProductList.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/MenProductList.css'

const WomenProductList = () => {
    const products = [
      { id: 1, name: 'STA Houndstooth Baby Milo Tee', price: '$129.00', imageUrl: 'https://int.bape.com/cdn/shop/files/0MXSWW3035XXNFUX-pdp-2.jpg?v=1727341896&width=700' },
      { id: 2, name: 'STA Houndstooth College Relaxed Fit Tee', price: '$147.00', imageUrl: 'https://int.bape.com/cdn/shop/files/0MXHAW4338XXNBWX-pdp-2.jpg?v=1727422292&width=700' },
      { id: 3, name: 'STA Houndstooth By Bathing Ape Relaxed Fit Tee', price: '$147.00', imageUrl: 'https://int.bape.com/cdn/shop/files/0PXCDW220309NBKZ-pdp-2.jpg?v=1726826494&width=700' },
      { id: 4, name: 'STA Houndstooth Ape Head Tee', price: '$129.00', imageUrl: 'https://int.bape.com/cdn/shop/files/0MXBGW4327XXNMLX-pdp-2.jpg?v=1726727667&width=700' },
      // Thêm sản phẩm khác nếu cần
    ];
  
    return (
      <div className="product-page">
        <div className="filter">
          <h3>Filter</h3>
          <div className="filter-section">
            <h4>Gender</h4>
            <label><input type="checkbox" /> Women (440)</label>
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
          <h1>Women</h1>
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
  
 export default WomenProductList;