import './Registration.css'
import React, { useState } from 'react'
import axios from 'axios'

function Registration() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  //check if the username and password are correct
  const handleRegister = (event) => {
    event.preventDefault()
    axios.post('/api/register', {email, user_password: password, username: username})
    .then(res => console.log(res.data.message))
    .catch(err => console.log(err.response.data.message))
  }

  

  return(
    <div className="input-container">
      <div className="login-form">
        <div>
          <label className="login-label">USERNAME </label>
          <br />
          <input 
            className="login-input" 
            type="text" 
            value = {username} 
            onChange = {handleUsernameChange}
            placeholder ='Enter your username'
          />
        </div>
        <div>
          <label className="login-label">EMAIL</label>
          <br />
          <input
            className="login-input"
            type="text"
            value = {email}
            onChange = {handleEmailChange}
            placeholder='Enter your school email'
          />
        </div>
        <div >
          <label className="login-label">PASSWORD </label>
          <br />
          <input 
            className="login-input" 
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder='Enter your password'
            />
        </div>
        <div >
          <label className="login-label">RE-ENTER PASSWORD </label>
          <input 
            className="login-input" 
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder='Renter your password'
            />
        </div>
        <div className="button-container">
          <button onClick={handleRegister} className="login-button">
          REGISTER
          </button>
        </div>
      </div>
    </div>
  );
  
}


export default Registration
