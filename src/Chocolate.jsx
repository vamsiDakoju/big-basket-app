import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './store';
import './Chocolate.css'; // Scoped CSS

function Chocolate() {
  const productObjects = useSelector(globalState => globalState.products.chocolate);
  const dispatch = useDispatch();

  const productListItems = productObjects.map((product, index) => (
    <li key={index} className="choco-product-card">
      <img src={product.image} alt={product.name} className="choco-product-image" />
      <div className="choco-product-info">
        <h3 className="choco-product-name">{product.name}</h3>
        <p className="choco-product-price">₹{product.price}</p>
      </div>
      <button
        className="choco-add-cart-button"
        onClick={() => dispatch(AddToCart(product))}
      >
        Add To Cart
      </button>
    </li>
  ));

  return (
    <div className="choco-fullscreen-wrapper">
      <div className="choco-container">
        <h1 className="choco-page-title">Chocolates</h1>
        <ol className="choco-product-list">
          {productListItems}
        </ol>
      </div>
    </div>
  );
}

export default Chocolate;
