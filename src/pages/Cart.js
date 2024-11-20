import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const { cart, getTotal, gstRate, removeFromCart, updateQuantity } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [discountMessage, setDiscountMessage] = useState('');

  const validDiscountCodes = {
    'SAVE10': 0.1, // 10% off
    'DISCOUNT20': 20, // Fixed ₹20 off
    'FREESHIP': 0, // Free shipping, no discount
  };

  const handleApplyCoupon = () => {
    const discountAmount = validDiscountCodes[couponCode.trim().toUpperCase()];

    if (discountAmount !== undefined) {
      setIsDiscountApplied(true);
      if (discountAmount === 0) {
        setDiscountMessage('Free Shipping Applied');
      } else if (discountAmount < 1) {
        setDiscountMessage('Discount Applied: 10% off');
      } else {
        setDiscountMessage(`Discount Applied: ₹${discountAmount} off`);
      }
    } else {
      alert('Invalid Discount Code');
      setDiscountMessage('');
      setIsDiscountApplied(false);
    }
  };

  const calculateTotalWithDiscount = () => {
    let total = getTotal();
    if (isDiscountApplied) {
      const discountAmount = validDiscountCodes[couponCode.trim().toUpperCase()];
      if (discountAmount < 1) {
        total *= (1 - discountAmount); // Apply percentage discount
      } else {
        total -= discountAmount; // Apply fixed amount discount
      }
    }
    return total.toFixed(2);
  };

  const calculateTax = (total) => {
    const gstAmount = (total * gstRate) / 100;
    const cgst = gstAmount / 2; // Split GST into CGST and SGST
    const sgst = gstAmount / 2;
    return { cgst, sgst };
  };

  const calculateFinalTotal = () => {
    let total = calculateTotalWithDiscount();
    total = parseFloat(total);
    const { cgst, sgst } = calculateTax(total);
    total += cgst + sgst; // Add CGST and SGST
    return total.toFixed(2);
  };

  // Function to handle the quantity change of each item
  const handleQuantityChange = (e, itemId) => {
    const newQuantity = parseInt(e.target.value, 10);
    updateQuantity(itemId, newQuantity); // Ensure updateQuantity is available in context
  };

  // Function to remove an item from the cart
  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId); // Ensure removeFromCart is available in context
  };

  const finalTotal = calculateFinalTotal();

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <div>
                <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                <select
                  id={`quantity-${item.id}`}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(e, item.id)} // Use the correct function name
                >
                  {[...Array(10).keys()].map((i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-total">
        {isDiscountApplied && <p>{discountMessage}</p>}
        <h3>Subtotal (Excluding Taxes): ₹{getTotal().toFixed(2)}</h3>
        <h3>Final Total (Including Taxes): ₹{finalTotal}</h3>
        <div>
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button onClick={handleApplyCoupon}>Apply Coupon</button>
        </div>
        <Link to={{ pathname: "/checkout", state: { finalTotal } }}>
          <button className="confirm-order">Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
