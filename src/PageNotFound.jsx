import React from 'react';
import './PageNotFound.css';

function PageNotFound() {
  return (
    <div className="notfound-wrapper">
      <div className="notfound-container">
        <h1>404</h1>
        <p>Oops! The page you’re looking for doesn’t exist.</p>
        <a href="/" className="home-button">Go Back Home</a>
      </div>
    </div>
  );
}

export default PageNotFound;
