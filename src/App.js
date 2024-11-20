import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSummary from './pages/OrderSummary';
import OrderConfirmation from './pages/OrderConfirmaton';
import ThankYou from './pages/ThankYou';
import Home from './pages/Home';

function App() {
  return (
    <CartProvider>
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart/>} />      
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
