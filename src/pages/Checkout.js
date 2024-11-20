import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

function Checkout() {
  const { cart, applyDiscount, getFinalTotal } = useCart();
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState('');
  const [discountMessage, setDiscountMessage] = useState('');
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
  });
  const [finalTotal, setFinalTotal] = useState(0);

  // Handle discount code apply
  const handleDiscountApply = () => {
    const response = applyDiscount(discountCode);

    if (response.success) {
      setIsDiscountApplied(true);
      setDiscountMessage(response.message);
    } else {
      setDiscountMessage(response.message);
      setIsDiscountApplied(false);
    }
  };

  // Update the final total whenever the discount code, cart, or taxes change
  useEffect(() => {
    const { totalAfterTax } = getFinalTotal();
    setFinalTotal(parseFloat(totalAfterTax).toFixed(2));
  }, [discountCode, cart, getFinalTotal]); // Re-run whenever discount code, cart, or getFinalTotal changes

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    if (!shippingDetails.name || !shippingDetails.address) {
      alert('Please fill in all shipping details.');
      return;
    }

    // Fetch the final total after discount and taxes
    const { totalAfterTax, cgst, sgst } = getFinalTotal();
    const finalTotal = parseFloat(totalAfterTax).toFixed(2);

    // Pass the final total, taxes, and shipping details to the Order Confirmation page
    navigate('/order-confirmation', {
      state: { finalTotal, taxes: { cgst, sgst }, shippingDetails },
    });
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
                <p>
                  {item.name} (x{item.quantity}) - ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            {isDiscountApplied && <p>{discountMessage}</p>}
            <h3>Final Total (Including Taxes): ₹{finalTotal}</h3>
          </div>

          <div className="checkout-form">
            <h3>Shipping Details</h3>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={shippingDetails.name}
                onChange={handleShippingChange}
                placeholder="Enter your name"
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={shippingDetails.address}
                onChange={handleShippingChange}
                placeholder="Enter your address"
              />
            </label>
            <label>
              Discount Code:
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter discount code"
              />
              <button onClick={handleDiscountApply}>Apply</button>
            </label>
          </div>

          <button className="confirm-order" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
