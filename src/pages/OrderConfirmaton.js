import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

function OrderConfirmation() {
  const { cart, getTotal } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Thank You page after a brief delay to show order confirmation
    setTimeout(() => {
      navigate('/thank-you');
    }, 3000); // 3 seconds delay
  }, [navigate]);

  return (
    <div className="order-confirmation-container">
      <h1>Order Confirmation</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. No order has been placed.</p>
      ) : (
        <div>
          <h3>Your Order Summary:</h3>
          {cart.map((item) => (
            <div key={item.id} className="order-confirmation-item">
              <p>{item.name} (x{item.quantity}) - ${item.price * item.quantity}</p>
            </div>
          ))}
          <h3>Total: ${getTotal()}</h3>
          <p>Your order has been successfully placed!</p>
          <p>You will be redirected to the Thank You page shortly.</p>
        </div>
      )}
    </div>
  );
}

export default OrderConfirmation;
