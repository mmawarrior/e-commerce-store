import React from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css'; // Import CSS file for styling

const ProductDetail = ({ products, addToCart }) => {
  const { productId } = useParams();

  // Find the product with the matching productId
  const product = products.find(product => product.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="wrapper">
      <div className="product-img">
        <img src={`/${product.image}`} alt={product.name} />
      </div>
      <div className="product-info">
        <div className="product-text">
          <h1>{product.name}</h1>
          <h2>by Jackson Nguyen</h2>
          <p>{product.description}</p> {/* Display the product description */}
        </div>
        <div className="product-price-btn">
        <p><span id="product-price">{product.price}</span>$</p>
          <button type="button" onClick={() => addToCart(product)}>buy now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
