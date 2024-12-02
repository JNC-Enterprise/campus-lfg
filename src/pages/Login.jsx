import './Login.css'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar.jsx';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = (event) => {
    event.preventDefault();
  
    axios.post('/api/login', { email, user_password: password })
      .then(res => {
        // Log the success message
        console.log(res.data.message);
  
        // Store the JWT token in localStorage (for subsequent API requests)
        localStorage.setItem('authToken', res.data.token);
  
        // Optionally, store the userId if you need it elsewhere
        localStorage.setItem('userId', res.data.userId);
  
        // Redirect to the home page or the appropriate page
        navigate('/');
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          // Handle incorrect credentials or failed login
          console.log(err.response.data.message);
        } else {
          // Handle other errors (e.g., network error)
          console.log('An error occurred during login.');
        }
      });
  };

  return(
    <div>
      <Navbar/>
      <div className="input-container">
        <div className="login-form">
          <label className="login-title">Log In</label>
          <div>
            <label className="login-label">Email </label>
            <input 
              className="login-input" 
              type="text" 
              value = {email} 
              onChange = {handleEmailChange}
              placeholder ='Enter your email'
            />
          </div>
          <div >
            <label className="login-label">PASSWORD </label>
            <input 
              className="login-input" 
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder='Enter your password'
              />
          </div>
          <div className="button-container">
            <button onClick={handleLogin} className="login-button">
            LOGIN
            </button>
          </div>
          <div className="registration-container">
            <label>Don't have an account?</label>
            <a href="/register" className="registration-link">Register Here</a>
          </div>
        </div>
      </div>
    </div>
  );
  
}


export default Login;
