import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Register from './components/register';
import Navbar from './components/user/navbar';
import ProductDetail from './components/user/productDetail';
import Cart from './components/user/cart';
import VideoPlayer from './components/video';
import UserGroups from './components/user/usergroups';
import MenProductList from './components/user/MenProductList';
import WomenProductList from './components/user/WomenProductList';
import KidProductList from './components/user/KidProductList';
import LoginForm from './components/user/LoginForm';
import AdminPage from './components/admin/AdminPage'; 
import AdminProduct from './components/admin/AdminProduct';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  const ProtectedRoute = ({ children, isLoggedIn, requiredRole }) => {
    const storedRole = localStorage.getItem('role');
  
    if (!isLoggedIn || !storedRole || storedRole !== requiredRole) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingProductIndex = prevCartItems.findIndex(item => item.id === product.id);
      if (existingProductIndex !== -1) {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingProductIndex].quantity += product.quantity;
        return updatedCartItems;
      } else {
        return [...prevCartItems, { ...product }];
      }
    });
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const products = [
    { id: 1, name: 'Áo thun', price: 200000, image: 'https://int.bape.com/cdn/shop/files/0ZXSTM131003NBLX-pdp-1.jpg?v=1726666399&width=1200',
      thumbnailImages: [
        'https://int.bape.com/cdn/shop/files/0ZXSTM131003NBLX-pdp-2.jpg?v=1726728080&width=1200',
        'https://int.bape.com/cdn/shop/files/0ZXSTM131003NBLX-pdp-2.jpg?v=1726728080&width=200',
        'https://int.bape.com/cdn/shop/files/0ZXSTM131003NBLX-pdp-3.jpg?v=1726728080&width=1200',
    ] },
    // Các sản phẩm khác...
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (token) {
      setIsLoggedIn(true);
      setRole(userRole);
    }
  }, []);

  return (
    <div>
      <Navbar cartCount={cartItems.length} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} role={role} />
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} onRemove={handleRemoveItem} />} />
        <Route path="/video" element={<VideoPlayer />} />
        <Route path="/user-groups" element={<UserGroups />} />
        <Route path="/products/men" element={<MenProductList />} />
        <Route path="/products/women" element={<WomenProductList />} />
        <Route path="/products/kid" element={<KidProductList />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          } />
        
        <Route path="/admin/products" element={<AdminProduct />} />  
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
