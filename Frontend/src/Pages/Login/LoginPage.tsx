// Author: Malek Ouaida
// File: LoginPage.tsx
/*-- LoginPage.tsx -----------------------------------------------------------------------

   This file defines the LoginPage component, which provides a login interface for users.
   It includes input fields for email and password, and allows users to sign in or navigate
   to the sign-up page. Social login buttons are also displayed for alternative login methods.

   Props:
      onSignUp          : A function that triggers the navigation to the sign-up page

   State:
      email             : Stores the email input from the user
      password          : Stores the password input from the user

   Methods:
      handleLogin       : Sends a POST request with email and password to the backend API 
                          for authentication. On success, it stores the token and userId 
                          in localStorage and redirects to the main page.

------------------------------------------------------------------------------------------*/

import React, { useState } from 'react';
import './LoginPage.css';

interface LoginPageProps {
  onSignUp: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handles the login process by sending credentials to the backend API
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token and userId in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);

        // Redirect to the main page after successful login
        window.location.href = '/mainpage';
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <img src="/images/Login Picture.jpeg" alt="Fashion Image" className="login-image" />
      </div>

      <div className="right-section">
        <div className="login-content">
          <img src="/images/Logo_noBG.png" alt="Vesture Logo" className="login-logo" />
          <h1 className="login-title">Login to Vesture</h1>
          <div className="input-container">
            <i className="icon-user"></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </div>
          <div className="input-container">
            <i className="icon-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </div>

          <p className="forgot-password">Forgot Password?</p>
          <button className="login-btn" onClick={handleLogin}>LOGIN</button>

          <button className="signup-btn" onClick={onSignUp}>
            Not a member yet? Become one now!
          </button>

          <p className="or-text">Or Login With</p>
          <div className="social-login">
            <button className="social-btn google-btn">
              <i className="fab fa-google"></i>
            </button>
            <button className="social-btn facebook-btn">
              <i className="fab fa-facebook-f"></i>
            </button>
            <button className="social-btn apple-btn">
              <i className="fab fa-apple"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
