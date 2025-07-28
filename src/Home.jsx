import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './store';
import './Home.css';

const priceRanges = [
  { label: 'Under ₹100', min: 0, max: 100 },
  { label: '₹101 – ₹250', min: 101, max: 250 },
  { label: '₹251 – ₹500', min: 251, max: 500 },
  { label: '₹501 – Above', min: 501, max: Infinity },
];

function Home() {
  const dispatch = useDispatch();

  const milk = useSelector(state => state.products.milk);
  const veg = useSelector(state => state.products.veg);
  const nonveg = useSelector(state => state.products.nonveg);
  const chocolate = useSelector(state => state.products.chocolate);

  const allProducts = [...milk, ...veg, ...nonveg, ...chocolate];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [tempSelectedRanges, setTempSelectedRanges] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (showDropdown) {
      setTempSelectedRanges(selectedRanges);
    }
  }, [showDropdown]);

  const handleTempCheckboxChange = (range) => {
    setTempSelectedRanges((prev) =>
      prev.includes(range)
        ? prev.filter((r) => r !== range)
        : [...prev, range]
    );
  };

  const handleApply = () => {
    setSelectedRanges(tempSelectedRanges);
    setShowDropdown(false);
    setCurrentPage(1);
  };

  const handleCancel = () => {
    setTempSelectedRanges(selectedRanges);
    setShowDropdown(false);
  };

  const isInSelectedRange = (price) => {
    if (selectedRanges.length === 0) return true;
    return selectedRanges.some((rangeLabel) => {
      const range = priceRanges.find((r) => r.label === rangeLabel);
      return price >= range.min && price <= range.max;
    });
  };

  // ✅ Alphanumeric sort with numeric-last
  const filteredProducts = allProducts
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        isInSelectedRange(product.price)
    )
    .sort((a, b) => {
      const nameA = a.name.trim();
      const nameB = b.name.trim();

      const isAOnlyNumber = /^\d+$/.test(nameA);
      const isBOnlyNumber = /^\d+$/.test(nameB);

      const isAStartsWithNumber = /^\d/.test(nameA);
      const isBStartsWithNumber = /^\d/.test(nameB);

      if (isAOnlyNumber && !isBOnlyNumber) return 1;
      if (!isAOnlyNumber && isBOnlyNumber) return -1;

      if (isAStartsWithNumber && !isBStartsWithNumber) return 1;
      if (!isAStartsWithNumber && isBStartsWithNumber) return -1;

      return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: 'base' });
    });

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home-fullscreen-wrapper">
      <div className="home-container">
        <h1 className="home-page-title">Products</h1>

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="home-search-bar"
        />

        <div className="price-dropdown-wrapper" ref={dropdownRef}>
          <div
            className="price-dropdown-toggle"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            Filter by Price Range 
            <svg className="icon price-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.91626 11.0013C9.43597 11.0013 10.7053 12.0729 11.011 13.5013H16.6663L16.801 13.515C17.1038 13.5771 17.3311 13.8453 17.3313 14.1663C17.3313 14.4875 17.1038 14.7555 16.801 14.8177L16.6663 14.8314H11.011C10.7056 16.2601 9.43619 17.3314 7.91626 17.3314C6.39643 17.3312 5.1269 16.2601 4.82153 14.8314H3.33325C2.96598 14.8314 2.66821 14.5336 2.66821 14.1663C2.66839 13.7992 2.96609 13.5013 3.33325 13.5013H4.82153C5.12713 12.0729 6.39665 11.0015 7.91626 11.0013ZM7.91626 12.3314C6.90308 12.3316 6.08148 13.1532 6.0813 14.1663C6.0813 15.1797 6.90297 16.0011 7.91626 16.0013C8.9297 16.0013 9.75122 15.1798 9.75122 14.1663C9.75104 13.153 8.92959 12.3314 7.91626 12.3314ZM12.0833 2.66829C13.6031 2.66829 14.8725 3.73966 15.178 5.16829H16.6663L16.801 5.18196C17.1038 5.24414 17.3313 5.51212 17.3313 5.83333C17.3313 6.15454 17.1038 6.42253 16.801 6.4847L16.6663 6.49837H15.178C14.8725 7.92701 13.6031 8.99837 12.0833 8.99837C10.5634 8.99837 9.29405 7.92701 8.98853 6.49837H3.33325C2.96598 6.49837 2.66821 6.2006 2.66821 5.83333C2.66821 5.46606 2.96598 5.16829 3.33325 5.16829H8.98853C9.29405 3.73966 10.5634 2.66829 12.0833 2.66829ZM12.0833 3.99837C11.0698 3.99837 10.2483 4.81989 10.2483 5.83333C10.2483 6.84677 11.0698 7.66829 12.0833 7.66829C13.0967 7.66829 13.9182 6.84677 13.9182 5.83333C13.9182 4.81989 13.0967 3.99837 12.0833 3.99837Z"></path></svg>
          </div>

          {showDropdown && (
            <div className="price-dropdown-content">
              {priceRanges.map((range) => (
                <label key={range.label} className="price-checkbox-label">
                  <input
                    type="checkbox"
                    value={range.label}
                    checked={tempSelectedRanges.includes(range.label)}
                    onChange={() => handleTempCheckboxChange(range.label)}
                  />
                  {range.label}
                </label>
              ))}
              <div className="dropdown-buttons">
                <button className="dropdown-btn apply" onClick={handleApply}>Apply</button>
                <button className="dropdown-btn cancel" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <h1 className="no-results">No products found.</h1>
        ) : (
          <ol className="home-product-list">
            {currentProducts.map((product, index) => (
              <li key={index} className="home-product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="home-product-image"
                />
                <div className="home-product-info">
                  <h3 className="home-product-name">{product.name}</h3>
                  <p className="home-product-price">₹{product.price}</p>
                  <p className="home-product-description">{product.description}</p>
                </div>
                <button
                  className="home-add-cart-button"
                  onClick={() => dispatch(AddToCart(product))}
                >
                  Add To Cart
                </button>
              </li>
            ))}
          </ol>
        )}

        {filteredProducts.length > 0 && (
          <div className="pagination-controls">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`pagination-button ${index + 1 === currentPage ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
