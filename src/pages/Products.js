import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';  // Import the custom hook
import './Products.css';

function Products() {
  const { addToCart } = useCart(); // Get addToCart function from context

  // Sample product data
  const products = [
    { id: 1, name: 'Product 1', description: 'This is a description of Product 1', price: 20 },
    { id: 2, name: 'Product 2', description: 'This is a description of Product 2', price: 30 },
    { id: 3, name: 'Product 3', description: 'This is a description of Product 3', price: 40 },
  ];

  return (
    <div>
      <h1>Our Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <h4>₹{product.price}</h4>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            <Link to={`/product/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
