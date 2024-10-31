import './Login.css'
import React, { useState } from 'react'
import axios from 'axios'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  //check if the username and password are correct
  const handleLogin = (event) => {
    event.preventDefault()
    axios.post('/api/login', {email: username, user_password: password})
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  

  return(
    <div className="input-container">
      <div className="login-form">
        <div>
          <label className="login-label">USERNAME </label>
          <input 
            className="login-input" 
            type="text" 
            value = {username} 
            onChange = {handleUsernameChange}
            placeholder ='Enter your username'
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


export default Login
