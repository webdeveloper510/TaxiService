import React, {useState} from "react";
import logo from '../../assets/images/taxi-logo.png';
import {Link} from "react-router-dom";
const  Header=()=> {
  //const [showLinks, setShowLinks] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
    return (
      <header>
      
        <div class="container-header">
      <div className="logo"><img src={logo} className="App-logo" alt="logo" /></div>
        <div class="nav-bar">
        <nav className="navigation">
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* icon from Heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li><a href="/">Home</a></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/get-a-car">Get a Car</Link></li>
          <li><Link to="/booking">Booking</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <div class="mobile-login-btn">
          <li class="user-login"><Link to="/login">Login</Link></li>
          <li class="sign-list"><Link to="/signup">Sign Up</Link></li>
          </div>
        </ul>
      </div>
    </nav>
        </div>

        <div class="header-buttons">
        <button class="login-btn"><Link to="/login">Login</Link></button>
        <button class="sign-up-btn"><Link to="/signup">Sign Up</Link></button>
        </div>
        </div>
      </header>
    );
  };

 export default Header; 