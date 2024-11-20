import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './OrderSummary.css';

function OrderSummary() {
  const { cart, getTotal, updateItemQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // Redirect to the order confirmation page
    navigate('/order-confirmation');
  };

  return (
    <div className="order-summary-container">
      <h1>Order Summary</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. Please add items to your cart.</p>
      ) : (
        <div>
          <h3>Items in your cart:</h3>
          {cart.map((item) => (
            <div key={item.id} className="order-summary-item">
              <p>{item.name} (x{item.quantity}) - ${item.price * item.quantity}</p>
              <div className="item-actions">
                <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>Increase Quantity</button>
                <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>Decrease Quantity</button>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <h3>Total: ${getTotal()}</h3>
          <button onClick={handlePlaceOrder} className="place-order-btn">Place Order</button>
        </div>
      )}
    </div>
  );
}

export default OrderSummary;
