import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Navbar from './components/user/navbar';
import ProductDetail from './components/user/productDetail';
import Cart from './components/user/cart';
import VideoPlayer from './components/video';
import UserGroups from './components/user/usergroups';
import MenProductList from './components/user/MenProductList';
import ProductList from './components/user/productList';
import ProductWomen from './components/user/WomenProductList';
import KidProductList from './components/user/KidProductList';
import WomenProductList from './components/user/WomenProductList';


const App = () => {
  const [cartItems, setCartItems] = useState([]);
  
  // Định nghĩa products ở đây
  const products = [
    { id: 1, name: 'Áo thun', price: 200000, image: 'https://int.bape.com/cdn/shop/files/0ZXSTM131003NBLX-pdp-1.jpg?v=1726666399&width=1200',
      thumbnailImages: [
        'https://int.bape.com/cdn/shop/files/0ZXSTM131003NBLX-pdp-1.jpg?v=1726666399&width=1200',
        'https://int.bape.com/cdn/shop/files/0ZXSTM131003NBLX-pdp-2.jpg?v=1726728080&width=1200', // Ảnh thu nhỏ 1
        'https://int.bape.com/cdn/shop/files/0ZXSTM131003NBLX-pdp-3.jpg?v=1726728080&width=1200', // Ảnh thu nhỏ 2
        'https://int.bape.com/cdn/shop/files/0ZXSTM131003NGYX-pdp-1.jpg?v=1726728080&width=200', // Ảnh thu nhỏ 3
      ], // Thêm danh sách ảnh thu nhỏ
     },
    { id: 2, name: 'Quần jeans', price: 500000, image: 'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXSWM115304NGRX/0ZXSWM115304NGRX-pdp-1.jpg' },
    { id: 3, name: 'Áo khoác', price: 700000, image: 'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXLTM111015NGYX/0ZXLTM111015NGYX-pdp-1.jpg' },
    { id: 4, name: 'Cargo jean', price: 100000000, image: 'https://int.bape.com/cdn/shop/files/0PXJNW250302NBLX-pdp-1.jpg?v=1727433157&width=1200' },
    { id: 5, name: 'Áo thun', price: 200000, image: 'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXTEM110323NWHX/0ZXTEM110323NWHX-pdp-1.jpg' },
    { id: 6, name: 'Quần jeans', price: 500000, image: 'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXSWM115304NGRX/0ZXSWM115304NGRX-pdp-1.jpg' },
    { id: 7, name: 'Áo khoác', price: 700000, image: 'https://ithk-pro-itmall-item.oss-cn-hongkong.aliyuncs.com/2/product/0ZXLTM111015NGYX/0ZXLTM111015NGYX-pdp-1.jpg' },
    { id: 8, name: 'Cargo jean', price: 100000000, image: 'https://int.bape.com/cdn/shop/files/0PXJNW250302NBLX-pdp-1.jpg?v=1727433157&width=1200' }
  ];

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingProductIndex = prevCartItems.findIndex(item => item.id === product.id);
      if (existingProductIndex !== -1) {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingProductIndex].quantity += 1;
        return updatedCartItems;
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div>
      <Navbar cartCount={cartItems.length} />
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} onRemove={(id) => setCartItems(cartItems.filter(item => item.id !== id))} />} />
        <Route path="/video" element={<VideoPlayer />} />
        <Route path="/user-groups" element={<UserGroups />} /> {/* Thêm route cho UserGroups */}
        <Route path="/products/men" element={<MenProductList />} /> {/* Thêm route cho MenProductList */}
        <Route path="/products/women" element={<WomenProductList />} /> 
        <Route path="/products/kid" element={<KidProductList />} /> 
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
