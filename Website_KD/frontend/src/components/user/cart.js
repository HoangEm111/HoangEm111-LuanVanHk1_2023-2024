import React from 'react';
import '../../css/cart.css'; // Thêm CSS cho giỏ hàng nếu cần

const Cart = ({ cartItems, onRemove }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2>Giỏ Hàng</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">{item.price.toLocaleString()} VND</span>
                  <span className="cart-item-quantity">Số lượng: {item.quantity}</span>
                  <p className="cart-item-size">Kích thước: {item.size}</p>
                </div>
                <button onClick={() => onRemove(item.id)} className="cart-item-remove">Xóa</button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <strong>Tổng: {calculateTotal()} VND</strong>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
