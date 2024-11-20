import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const { cart, addToCart, getTotal, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState(1); // Default to 1
  
  const handleQuantityChange = (e, itemId) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 10) {
      alert("You can only add up to 10 items of a product.");
      return;
    }
    addToCart({ id: itemId, quantity: newQuantity });
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <div>
              <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
              <select
                id={`quantity-${item.id}`}
                value={item.quantity}
                onChange={(e) => handleQuantityChange(e, item.id)}
              >
                {[...Array(10).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            <p>Total: ${item.price * item.quantity}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))
      )}

      <div className="cart-total">
        <h3>Total: ${getTotal()}</h3>
        <Link to="/checkout">
          <button className="confirm-order">Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
