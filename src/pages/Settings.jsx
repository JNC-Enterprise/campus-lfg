import "./Settings.css";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar.jsx';

function Settings() {
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleNewEmailChange = (event) => {
    setNewEmail(event.target.value)
  }

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value)
  }

  const handleNewUsernameChange = (event) => {
    setNewUsername(event.target.value)
  }

  const handleEmailInput = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordInput = (event) => {
    setPassword(event.target.value)
  }

  const handleSettingsChange = (event) => {
    event.preventDefault();
  
    // Check what settings have changed
    const updates = {};
    if (newEmail && newEmail !== email) updates.newEmail = newEmail;
    if (newPassword) updates.newPassword = newPassword;
    if (newUsername) updates.newUsername = newUsername;
  
    if (Object.keys(updates).length === 0) {
      console.log("No changes detected");
      navigate('/'); // Send user back to home page. Maybe give a warning instead?
    }
  
    // Ensure current email and password are sent for authentication
    const payload = {
      email,
      user_password: password,
      ...updates,
    };
  
    // Make the API call to update settings
    axios
      .post('/api/update-settings', payload)
      .then((res) => {
        console.log(res.data.message);
        // Handle success (e.g., notify the user that the update was successful)
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          console.log(err.response.data.message);
        } else {
          console.error("An error occurred:", err);
        }
      });
  };
  

  return (
    <div>
      <Navbar/>
      <div className="settings-container">
        <div className="settings-form">
          <label className="settings-title">Change Settings</label>
          <div>
            <label className="settings-label">Current Email</label>
            <input 
              className="settings-input"
              type="text"
              value = {email}
              onChange = {handleEmailInput}
              placeholder = 'Enter your CURRENT email'
            />
          </div>
          <div>
            <label className="settings-label">Current Password</label>
            <input 
              className="settings-input"
              type="text"
              value = {password}
              onChange = {handlePasswordInput}
              placeholder = 'Enter your CURRENT password'
            />
          </div>
          <div>
            <label className="settings-label">Change Email</label>
            <input 
              className="settings-input"
              type="text"
              value = {newEmail}
              onChange = {handleNewEmailChange}
              placeholder = 'Enter your NEW email'
            />
          </div>
          <div>
            <label className="settings-label">Change Password</label>
            <input
              className="settings-input"
              type="text"
              value = {newPassword}
              onChange = {handleNewPasswordChange}
              placeholder = 'Enter your NEW password'
            />
          </div>
          <div>
            <label className="settings-label">Change Username</label>
            <input
              className="settings-input"
              type="text"
              value = {newUsername}
              onChange = {handleNewUsernameChange}
              placeholder = 'Enter your NEW username'
            />
          </div>
          <div className="button-container">
            <button onClick={handleSettingsChange} className="change-button">
              UPDATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}


export default Settings;