// Author: Malek Ouaida
// File: SignUpPage.tsx
/*-- SignUpPage.tsx ------------------------------------------------------------------------

   This file defines the SignUpPage component, which allows users to create a new account 
   for the Vesture application. The page is split into two main sections: an image display 
   on the left and a form on the right where users enter their account information. 
   The component also handles form submission for account creation.

   Features:
      - Input Handling       : Collects username, email, and password inputs from the user.
      - Form Submission      : Submits user data to the backend API for account creation.
      - Navigation           : Redirects to the login page upon successful signup.
   
   Props:
      - onLogin (function)   : Callback function to switch back to the login page when 
                               signup is successful or if the user already has an account.
   
   Dependencies:
      - useState             : React hook for managing input state.
      - onLogin              : Prop function to redirect the user to the login page.

------------------------------------------------------------------------------------------*/

import React, { useState } from 'react';
import './SignUpPage.css';

interface SignUpPageProps {
  onLogin: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handles sign-up form submission and API call
  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        onLogin(); // Redirect to login page upon successful signup
      } else {
        const data = await response.json();
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="page-container">
      {/* Left section displays a fashion image */}
      <div className="left-section">
        <img src="/images/Sign Up Picture.jpeg" alt="Fashion" />
      </div>

      {/* Right section for the sign-up form */}
      <div className="right-section">
        <div className="form-container">
          <img src="/images/Logo_noBG.png" alt="Vesture Logo" className="logo" />
          <h1 className="title">Create Your Vesture Account</h1>

          {/* Username input */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />

          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />

          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />

          {/* Sign-up button */}
          <button className="btn" onClick={handleSignUp}>SIGN UP</button>

          {/* Link to switch to the login page */}
          <p className="login-text">Already have an account? <a href="#" onClick={onLogin}>Log In</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
