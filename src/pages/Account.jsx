import "./Account.css";
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Navbar from "./Navbar.jsx";

function Account() {
  const navigate = useNavigate();
  const handleAccount = (event) => {
    navigate('/');
  }

  return(
    <div>
      <Navbar/>
      <div className="input-container">
        <div className="login-form">
          <label className="login-title">Update Profile Info</label>
          <div>
            <label className="login-label">Change Username</label>
            <input 
              className="login-input"
              type="text"
              placeholder = 'New Username'
            />
          </div>
          <div>
            <label className="login-label">Change Bio</label>
            <textarea 
              className="change-bio"
              type="text"
              placeholder = 'New Bio'
            />
          </div>
          <div className="button-container">
            <button className="login-button" onClick={handleAccount}>
              UPDATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;