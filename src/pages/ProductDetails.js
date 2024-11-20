import React from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();

  // In a real app, you'd fetch the product details from an API.
  return (
    <div>
      <h1>Product Details - {id}</h1>
      <p>Details of product {id} will go here.</p>
    </div>
  );
}

export default ProductDetails;
