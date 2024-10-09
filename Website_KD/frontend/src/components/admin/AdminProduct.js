import React, { useState } from 'react';
import axios from 'axios';
import '../admin/css/admin.css';

const AdminProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [category_id, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sizes, setSizes] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();
      // Reset messages
      setSuccessMessage('');
      setErrorMessage('');
  
      // Kiểm tra dữ liệu đầu vào
      if (price <= 0 || quantity <= 0) {
        setErrorMessage('Price and quantity must be positive numbers.');
        return;
      }
  
      if (image.length > 512) {
        setErrorMessage('Image URL is too long. Please provide a shorter URL.');
        return;
      }

    // Kiểm tra dữ liệu đầu vào
    if (price <= 0 || quantity <= 0) {
      setErrorMessage('Price and quantity must be positive numbers.');
      setSuccessMessage('');
      return;
    }

    try {
      const productData = {
        name,
        price: parseFloat(price),
        image,
        description,
        category_id,
        sizes: sizes.split(',').map(size => size.trim()), // Tách chuỗi thành mảng
        quantity: parseInt(quantity, 10)
      };

      // Gửi yêu cầu POST tới API backend
      const response = await axios.post('http://localhost:3000/api/products/add', productData);

      if (response.status === 201) {
        setSuccessMessage('Product added successfully!');
        setErrorMessage('');
        // Reset các trường input
        setName('');
        setPrice('');
        setImage('');
        setDescription('');
        setCategory('');
        setQuantity('');
        setSizes('');
      }
    } catch (error) {
      setErrorMessage('Failed to add product. Please try again.');
      setSuccessMessage('');
      console.error(error); // Log lỗi chi tiết
    }
    if (image.length > 512) {
        setErrorMessage('Image URL is too long. Please provide a shorter URL.');
        return;
      }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleAddProduct}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" value={category_id} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div>
          <label>Sizes (comma separated):</label>
          <input 
            type="text" 
            value={sizes} 
            onChange={(e) => setSizes(e.target.value)} 
            placeholder="S, M, L, XL" 
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <button type="submit">Add Product</button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default AdminProduct;
