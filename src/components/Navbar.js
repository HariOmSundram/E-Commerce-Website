import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  

export default function Navbar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
      <h2>E-Commerce</h2>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '10px' }}>
        <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
        <li><Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link></li>
        <li><Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>Cart</Link></li>
      </ul>
    </nav>
  );
}
