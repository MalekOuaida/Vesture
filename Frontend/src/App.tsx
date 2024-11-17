// Author: Malek Ouaida
// File: App.tsx
/*-- App.tsx ------------------------------------------------------------------------

   This file defines the main App component for the Vesture application, which uses 
   React Router and GSAP animations to manage navigation and transitions between pages.
   The AnimatedRoutes component encapsulates routes with swipe animations, enhancing 
   user experience with smooth transitions between the login, sign-up, and main pages.

   Components:
      - AnimatedRoutes       : Manages routing and GSAP animations for page transitions.
      - App                  : Root component that includes React Router setup.

   Features:
      - GSAP Animations      : Adds swipe animations for page transitions.
      - React Router         : Configures routes for Login, SignUp, MainPage, and a 
                               default route.
      - Transition Callbacks : Defines callbacks (handleSignUp, handleLogin) for navigating
                               between pages with animations.

------------------------------------------------------------------------------------------*/

import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import LoginPage from './Pages/Login/LoginPage';
import SignUpPage from './Pages/SignUp/SignUpPage';
import MainPage from './Pages/MainPage/MainPage';

const AnimatedRoutes: React.FC = () => {
  const appRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  // Handles transition from LoginPage to SignUpPage with a swipe-up animation
  const handleSignUp = () => {
    gsap.timeline({
      onComplete: () => {
        navigate('/signup');
        gsap.set(appRef.current, { y: "0vh", opacity: 1 });
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.inOut" }
        );
      }
    })
    .to(appRef.current, {
      y: "-100vh", // Swipe up animation
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  };

  // Handles transition from SignUpPage to LoginPage with a swipe-down animation
  const handleLogin = () => {
    gsap.timeline({
      onComplete: () => {
        navigate('/login');
        gsap.set(appRef.current, { y: "0vh", opacity: 1 });
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.inOut" }
        );
      }
    })
    .to(appRef.current, {
      y: "100vh", // Swipe down animation
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  };

  return (
    <div ref={appRef} className="app-container">
      <div ref={contentRef}>
        <Routes>
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/login" element={<LoginPage onSignUp={handleSignUp} />} />
          <Route path="/signup" element={<SignUpPage onLogin={handleLogin} />} />
          {/* Default route to LoginPage */}
          <Route path="*" element={<LoginPage onSignUp={handleSignUp} />} />
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
