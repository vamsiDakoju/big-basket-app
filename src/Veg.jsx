import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './store';
import './Veg.css';

function Veg() {
  const productObjects = useSelector(globalState => globalState.products.veg);
  const dispatch = useDispatch();

  const productListItems = productObjects.map((product, index) => (
    <li key={index} className="veg-product-card">
      <img src={product.image} alt={product.name} className="veg-product-image" />
      <div className="veg-product-info">
        <h3 className="veg-product-name">{product.name}</h3>
        <p className="veg-product-price">₹{product.price}</p>
        <p className="veg-product-description">{product.description}</p>
      </div>
      <button
        className="veg-add-cart-button"
        onClick={() => dispatch(AddToCart(product))}
      >
        Add To Cart
      </button>
    </li>
  ));

  return (
    <div className="veg-fullscreen-wrapper">
      <div className="veg-container">
        <h1 className="veg-page-title">Vegetable Products</h1>
        <ol className="veg-product-list">
          {productListItems}
        </ol>
      </div>
    </div>
  );
}
export default Veg;