import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './store';
import './NonVeg.css';

function NonVeg() {
  const productObjects = useSelector(globalState => globalState.products.nonveg);
  const dispatch = useDispatch();

  const productListItems = productObjects.map((product, index) => (
    <li key={index} className="nonveg-product-card">
      <img src={product.image} alt={product.name} className="nonveg-product-image" />
      <div className="nonveg-product-info">
        <h3 className="nonveg-product-name">{product.name}</h3>
        <p className="nonveg-product-price">₹{product.price}</p>
        <p className="nonveg-product-description">{product.description}</p>
      </div>
      <button
        className="nonveg-add-cart-button"
        onClick={() => dispatch(AddToCart(product))}
      >
        Add To Cart
      </button>
    </li>
  ));

  return (
    <div className="nonveg-fullscreen-wrapper">
    <div className="nonveg-container">
      <h1 className="nonveg-page-title">Non-Veg Products</h1>
      <ol className="nonveg-product-list">
        {productListItems}
      </ol>
    </div>
  </div>
  );
}

export default NonVeg;
