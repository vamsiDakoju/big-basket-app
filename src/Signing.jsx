import React, { useState } from 'react';
import './Signing.css';

function Signing() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // State to hold error messages
  const [error, setError] = useState('');

  // Email validation: must end with '@gmail.com'
  const validateEmail = (email) => {
    return email.endsWith('@gmail.com');
  };

  // Password validation:
  // at least 6 characters, one uppercase, one lowercase, one number, one special character
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
  };

const handleSignUp = (e) => {
  e.preventDefault();

  if (!validateEmail(formData.email)) {
    setError('Email must end with @gmail.com');
    return;
  }

  const password = formData.password;
  const missingRules = [];

  if (password.length < 6) missingRules.push('- 6 characters');
  if (!/[A-Z]/.test(password)) missingRules.push('- uppercase letter');
  if (!/[a-z]/.test(password)) missingRules.push('- lowercase letter');
  if (!/[0-9]/.test(password)) missingRules.push('- digit');
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) missingRules.push('- special character');

  if (missingRules.length > 0) {
    const message = `Password must include:\n${missingRules.join('\n')}`;
    setError(message);
    return;
  }

  // ✅ Fetch existing users from localStorage (or start with empty array)
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  // ✅ Check if email already exists
  const userExists = existingUsers.some(user => user.email === formData.email);
  if (userExists) {
    setError('Account already exists with this email.');
    return;
  }

  // ✅ Add new user to the list
  const updatedUsers = [...existingUsers, formData];

  // ✅ Save the updated user list in localStorage
  localStorage.setItem('users', JSON.stringify(updatedUsers));

  // ✅ Optionally store signed-in user and auth flag
  localStorage.setItem('user', JSON.stringify({ username: formData.name }));
  localStorage.setItem('isAuthenticated', 'true');

  alert('Account created successfully! You can now log in.');

  // ✅ Reset form and switch to sign-in mode
  setFormData({ name: '', email: '', password: '' });
  setIsSignIn(true);
  setError('');
};


  const handleSignIn = (e) => {
  e.preventDefault();

  if (!validateEmail(formData.email)) {
    setError('Email must end with @gmail.com');
    return;
  }

  if (formData.password.length < 6) {
    setError('Password must be at least 6 characters.');
    return;
  }

  // ✅ Get all users from localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // ✅ Find the matching user
  const matchingUser = users.find(
    (user) =>
      user.email === formData.email && user.password === formData.password
  );

  if (matchingUser) {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify({ username: matchingUser.name }));
    setError('');
    window.location.href = '/';
  } else {
    setError('Invalid email or password. Please try again.');
  }
};

  return (
    <div className="signin-fullscreen-wrapper">
      <div className="signing-container">
        <h1 className="signing-title">Sign In / Sign Up</h1>
        <p className="signing-subtitle">Please log in to your account or sign up to get started!</p>

        {/* Display error message here if any */}
        {error && <div className="error-message">{error}</div>}

        <div className="toggle-buttons">
          <button
            className={`toggle-btn ${isSignIn ? 'active' : ''}`}
            onClick={() => {
              setIsSignIn(true);
              setError('');
            }}
          >
            Sign In
          </button>
          <button
            className={`toggle-btn ${!isSignIn ? 'active' : ''}`}
            onClick={() => {
              setIsSignIn(false);
              setError('');
            }}
          >
            Sign Up
          </button>
        </div>

        <div className="signing-forms">
          {isSignIn ? (
            <div className="signing-form">
              <h2>Sign In</h2>
              <form onSubmit={handleSignIn}>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                  />
                </label>
                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Your Password"
                    required
                  />
                </label>
                <button type="submit">Log In</button>
              </form>
            </div>
          ) : (
            <div className="signing-form">
              <h2>Sign Up</h2>
              <form onSubmit={handleSignUp}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                  />
                </label>
                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Your Password"
                    required
                  />
                </label>
                <button type="submit">Create Account</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Signing;