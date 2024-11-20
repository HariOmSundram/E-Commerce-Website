import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [gstRate] = useState(18); // GST rate: 18% (combined CGST + SGST is 9% each)

  // Define valid discount codes
  const validDiscountCodes = {
    'SAVE10': 0.1, // 10% off
    'DISCOUNT20': 20, // Fixed ₹20 off
    'FREESHIP': 0, // Free shipping, no discount
  };

  // Add or update item in the cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem
        );
      } else {
        return [...prevCart, item];
      }
    });
  };

  // Remove item from the cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  // Get the total price of items in the cart (without discount and tax)
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Function to calculate CGST and SGST based on net total
  const calculateTaxes = (netTotal) => {
    const cgst = (netTotal * 0.09).toFixed(2); // 9% of the net total for CGST
    const sgst = (netTotal * 0.09).toFixed(2); // 9% of the net total for SGST
    return { cgst: parseFloat(cgst), sgst: parseFloat(sgst) };
  };

  // Apply discount based on the discount code
  const applyDiscount = (code) => {
    const discountAmount = validDiscountCodes[code.trim().toUpperCase()];

    if (discountAmount !== undefined) {
      setDiscountCode(code.trim().toUpperCase());
      return {
        success: true,
        message: discountAmount === 0 ? 'Free Shipping Applied' : discountAmount < 1 ? '10% off applied' : `₹${discountAmount} off`,
      };
    } else {
      return { success: false, message: 'Invalid Discount Code' };
    }
  };

  // Get final total after applying discount and tax
  const getFinalTotal = () => {
    let total = getTotal();
    let discountAmount = 0;

    // Apply discount logic
    if (discountCode) {
      const discount = validDiscountCodes[discountCode];
      if (discount < 1) {
        total *= (1 - discount); // Apply percentage discount
      } else {
        total -= discount; // Apply fixed amount discount
      }
      discountAmount = discount;
    }

    // Calculate taxes after discount is applied
    const taxes = calculateTaxes(total);
    const totalAfterTax = (total + taxes.cgst + taxes.sgst).toFixed(2); // Total after discount + taxes

    return { total: total.toFixed(2), taxes, totalAfterTax }; // Return the total before taxes, taxes, and the final total after taxes
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotal, applyDiscount, gstRate, getFinalTotal }}>
      {children}
    </CartContext.Provider>
  );
};
