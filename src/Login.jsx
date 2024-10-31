import './Login.css'
import React, { useState } from 'react'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = () => {
    // Do any logic/verification here
    alert(`Loging in as: ${username}\nPassword you entered: ${password}`)
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


export default Login;
