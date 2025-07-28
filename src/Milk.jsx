import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './store';
import './Milk.css'; // Scoped CSS

function Milk() {
  const productObjects = useSelector(globalState => globalState.products.milk);
  const dispatch = useDispatch();

  const productListItems = productObjects.map((product, index) => (
    <li key={index} className="milk-product-card">
      <img src={product.image} alt={product.name} className="milk-product-image" />
      <div className="milk-product-info">
        <h3 className="milk-product-name">{product.name}</h3>
        <p className="milk-product-price">₹{product.price}</p>
        <p className="milk-product-description">{product.description}</p>
      </div>
      <button
        className="milk-add-cart-button"
        onClick={() => dispatch(AddToCart(product))}
      >
        Add To Cart
      </button>
    </li>
  ));

  return (
    <div className="milk-fullscreen-wrapper">
      <div className="milk-container">
        <h1 className="milk-page-title">Milk Products</h1>
        <ol className="milk-product-list">
          {productListItems}
        </ol>
      </div>
    </div>
  );
}

export default Milk;
