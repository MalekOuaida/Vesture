// Author: Malek Ouaida
// File: MainPage.tsx
/*-- MainPage.tsx ------------------------------------------------------------------------

   This file defines the MainPage component, which serves as the main landing page for the 
   Vesture application. The page includes a navbar with navigation links, a logout button, 
   and a masonry-style grid for displaying sample items.

   Features:
      - Profile Navigation   : Redirects to the user's profile page if logged in
      - Logout               : Clears authentication data and redirects to the login page
      - Sample Item Display  : A masonry grid layout showcasing sample images

   Dependencies:
      useNavigate            : React Router hook for programmatic navigation
      sampleItems            : Array of sample image paths to be displayed in the grid

------------------------------------------------------------------------------------------*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const sampleItems = [
    '/images/item1.jpeg',
    '/images/item2.jpeg',
    '/images/item3.jpeg',
    '/images/item4.jpeg',
    '/images/item5.jpeg',
    '/images/item6.jpeg',
    '/images/item7.jpeg',
    '/images/item8.jpeg',
    '/images/item9.jpeg',
    '/images/item10.jpeg',
    '/images/item11.jpeg',
    '/images/item12.jpeg',
    '/images/item13.jpeg',
    '/images/item14.jpeg',
    '/images/item15.jpeg',
    '/images/item16.jpeg',
    '/images/item17.jpeg',
    '/images/item18.jpeg',
    '/images/item19.jpeg',
    '/images/item20.jpeg',
  ];

  // Redirects user to their profile page if logged in, otherwise displays an alert
  const handleProfileNavigation = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate(`/profile/${userId}`);
    } else {
      alert("User not logged in");
    }
  };

  // Logs out the user by clearing local storage and redirecting to the login page
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="main-page">
      {/* Navbar with logo, navigation links, and logout button */}
      <nav className="navbar">
        <img src="/images/Logo_noBG.png" alt="Vesture Logo" className="logo" />
        <ul className="nav-links">
          <li><button onClick={handleProfileNavigation} className="nav-button">Profile</button></li>
          <li><a href="/closet" className="nav-link">Closet</a></li>
          <li><a href="/explore" className="nav-link">Explore</a></li>
        </ul>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </nav>

      {/* Masonry-style grid for sample item images */}
      <div className="grid-container">
        {sampleItems.map((item, index) => (
          <div key={index} className="grid-item">
            <img src={item} alt={`Item ${index + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
