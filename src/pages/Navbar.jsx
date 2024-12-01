import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          <img
              src="https://i.imgur.com/jev0l86.png"
              alt="Campus LFG Logo"
              style={{
                width: '130px',
                height: '75px',

              }}
            />
        </a>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <a href="/settings" className="settings-icon">
          <i className="settings-image">
            <img
              src="https://i.imgur.com/rcwr85z.png"
              alt="Settings Image"
              style={{
                width: '37px',
                height: '37px',
                
              }}
            />
          </i>
        </a>
        <a href="/account" className="user-icon">
          <i className="user-image">
            <img 
              src="https://i.imgur.com/CGFZyCx.png"
              alt="User Profile Image"
              style={{
                width: '28px',
                height: '28px',
              }}
            />
          </i>
        </a>
        <div>
          <ul className="nav-links">
            <li>
              <a href="/login" classname="login-link">Log In</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;