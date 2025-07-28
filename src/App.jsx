// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './Home';
import PageNotFound from './PageNotFound';
import Veg from './Veg';
import NonVeg from './NonVeg';
import Milk from './Milk';
import Chocolate from './Chocolate';
import Cart from './Cart';
import Orders from './Orders';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Signing from './Signing';
import PrivateRoute from './PrivateRoute';
import './MyStyles.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cartObjects = useSelector(globalState => globalState.cart);
  const totalCartCount = cartObjects.reduce((total, item) => total + item.quantity, 0);

  // Check auth on mount
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(auth === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    window.location.href = '/sign';
  };

  // Brand component to handle click and navigation
  function Brand() {
    const navigate = useNavigate();

    const handleBrandClick = () => {
      if (isAuthenticated) {
        navigate('/');  // Redirect to Home if logged in
      } else {
        navigate('/sign'); // Redirect to Sign In if not logged in
      }
    };

    return (
      <div onClick={handleBrandClick} style={{ cursor: 'pointer', userSelect: 'none' }}>
        <span className="brand">🛒 <strong>Big</strong></span>
        <span className="brand1"><strong>Basket</strong></span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="navbar-left">
          <Brand />
        </div>

        <div className="navbar-right">
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>

          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <Link to='/'>🏠 Home</Link>
            <Link to='/veg'>🥦 VegItems</Link>
            <Link to='/nonveg'>🍗 NonvegItems</Link>
            <Link to='/milk'>🥛 Milk</Link>
            <Link to='/chocolate'>🍫 Chocolate</Link>
            <Link to='/cart'>🛒 Cart {totalCartCount}</Link>
            <Link to='/orders'>📦 Orders</Link>
            <Link to='/about'>ℹ️ About Us</Link>
            <Link to='/contact'>📞 Contact Us</Link>

            {!isAuthenticated ? (
              <Link to='/sign'>🔐 Sign In</Link>
            ) : (
              <div
                className="profile-icon"
                onClick={handleLogout}  // directly logs out
                title="Logout"
                style={{ cursor: 'pointer' }}
              >
                👤
              </div>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        {/* Protected Routes */}
        <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path='/veg' element={<PrivateRoute><Veg /></PrivateRoute>} />
        <Route path='/nonveg' element={<PrivateRoute><NonVeg /></PrivateRoute>} />
        <Route path='/milk' element={<PrivateRoute><Milk /></PrivateRoute>} />
        <Route path='/chocolate' element={<PrivateRoute><Chocolate /></PrivateRoute>} />
        <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path='/orders' element={<PrivateRoute><Orders /></PrivateRoute>} />

        {/* Public Routes */}
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/sign' element={<Signing />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;