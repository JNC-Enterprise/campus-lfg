import './Login.css'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import axios from 'axios'

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

  //check if the email and password are correct
  const handleLogin = (event) => {
    event.preventDefault()
    axios.post('/api/login', {email, user_password: password})
    .then(res => 
      {console.log(res.data.message)
        navigate('/')
      })
    .catch(err => {
      if(err.response.status === 401){
        console.log(err.response.data.message)
      }
    })
  }

  return(
    <div className="input-container">
      <div className="login-form">
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
      </div>
    </div>
  );
  
}


export default Login;
