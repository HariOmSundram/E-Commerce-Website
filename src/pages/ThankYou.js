import React from 'react';
import { Link } from 'react-router-dom';
import './ThankYou.css';

function ThankYou() {
  return (
    <div className="thank-you-container">
      <h1>Thank You for Your Order!</h1>
      <p>Your order has been successfully placed. We are processing it now.</p>
      <p>You will receive an email confirmation shortly.</p>
      <Link to="/" className="back-to-home-btn">Back to Home</Link>
    </div>
  );
}

export default ThankYou;
