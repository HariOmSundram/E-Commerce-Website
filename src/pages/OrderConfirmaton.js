import React from 'react';
import { useLocation } from 'react-router-dom';
import './OrderConfirmation.css';

function OrderConfirmation() {
  const location = useLocation();
  const { finalTotal, taxes, shippingDetails } = location.state || { finalTotal: 0, taxes: { cgst: 0, sgst: 0 }, shippingDetails: {} };

  // Format the data before rendering
  const formattedFinalTotal = finalTotal.toFixed ? finalTotal.toFixed(2) : '0.00'; // Ensure it's a number
  const formattedCGST = taxes?.cgst ? taxes.cgst.toFixed(2) : '0.00'; // Safely format CGST
  const formattedSGST = taxes?.sgst ? taxes.sgst.toFixed(2) : '0.00'; // Safely format SGST
  const shippingName = shippingDetails?.name || 'Not Provided'; // Fallback for name
  const shippingAddress = shippingDetails?.address || 'Not Provided'; // Fallback for address

  return (
    <div className="order-confirmation-container">
      <h1>Order Confirmation</h1>
      <p>Thank you for your order!</p>

      <h3>Your Final Total is: ₹{formattedFinalTotal}</h3>
      
      {/* Tax breakdown: CGST and SGST */}
      <div className="tax-details">
        <p>CGST (0.5%): ₹{formattedCGST}</p>
        <p>SGST (0.5%): ₹{formattedSGST}</p>
      </div>

      {/* Shipping details */}
      <div className="shipping-details">
        <h3>Shipping Details</h3>
        <p><strong>Name:</strong> {shippingName}</p>
        <p><strong>Address:</strong> {shippingAddress}</p>
      </div>

      <p>Your order is being processed, and you will receive a confirmation email shortly.</p>
    </div>
  );
}

export default OrderConfirmation;
