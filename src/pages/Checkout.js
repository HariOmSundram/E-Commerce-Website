import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Checkout.css';

function Checkout() {
  const { cart, getTotal, discount, fixedDiscount, freeShipping } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  const handleDiscountApply = () => {
    if (discountCode === 'SAVE10') {
      setIsDiscountApplied(true);
      alert('Discount Applied: 10% off');
    } else {
      alert('Invalid Discount Code');
    }
  };

  const calculateFinalTotal = () => {
    let total = getTotal();
    if (discount && !isDiscountApplied) total *= (1 - discount);
    if (fixedDiscount) total -= fixedDiscount;
    if (isDiscountApplied) total *= 0.9; // 10% discount if applied
    return total;
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. Please add items to your cart.</p>
      ) : (
        <div>
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            {cart.map((item) => (
              <div key={item.id} className="checkout-item">
                <p>{item.name} (x{item.quantity}) - ${item.price * item.quantity}</p>
              </div>
            ))}
            <p>Total: ${getTotal()}</p>
            {discount && <p>Discount Applied: {discount * 100}%</p>}
            {fixedDiscount && <p>Fixed Discount: ${fixedDiscount}</p>}
            {isDiscountApplied && <p>Discount Code Applied: 10% off</p>}
            <h3>Final Total: ${calculateFinalTotal()}</h3>
          </div>

          <div className="checkout-form">
            <h3>Shipping Details</h3>
            <label>
              Name:
              <input type="text" />
            </label>
            <label>
              Address:
              <input type="text" />
            </label>
            <label>
              Discount Code:
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button onClick={handleDiscountApply}>Apply</button>
            </label>
          </div>

          <button className="confirm-order">Confirm Order</button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
