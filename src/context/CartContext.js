import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0); // 10% discount, for example
  const [fixedDiscount, setFixedDiscount] = useState(0); // Fixed discount amount
  const [freeShipping, setFreeShipping] = useState(false);

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
      if (itemIndex !== -1) {
        const newCart = [...prevCart];
        newCart[itemIndex].quantity += item.quantity;
        return newCart;
      }
      return [...prevCart, item];
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, getTotal, discount, fixedDiscount, freeShipping }}>
      {children}
    </CartContext.Provider>
  );
};
