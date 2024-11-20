import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Products.css';

function Products() {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});

  const products = [
    { id: 1, name: 'Product 1', description: 'This is a description of Product 1', price: 20 },
    { id: 2, name: 'Product 2', description: 'This is a description of Product 2', price: 30 },
    { id: 3, name: 'Product 3', description: 'This is a description of Product 3', price: 40 },
  ];

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({ ...prev, [productId]: parseInt(value, 10) || 1 }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart({ ...product, quantity });
  };

  return (
    <div>
      <h1>Our Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <h4>₹{product.price}</h4>
            <div className="product-actions">
              <label>
                Quantity:
                <select
                  value={quantities[product.id] || 1}
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </label>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
            <Link to={`/product/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
