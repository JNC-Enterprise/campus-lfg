import './Registration.css'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import axios from 'axios'

function Registration() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    setIsEmailValid(/^[\w\.]+@([\w-]+\.)+edu$/.test(inputEmail));
  }

  const handleEmailBlur = () => {
    setEmailTouched(true);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setDoPasswordsMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setDoPasswordsMatch(password === event.target.value);
  };

  //check if the username and password are correct
  const handleRegister = (event) => {
    event.preventDefault();
    if (!isEmailValid || !doPasswordsMatch) return; // Prevent submission if email is invalid
    axios.post('/api/register', { email, user_password: password, username })
      .then(res => {
        console.log(res.data.message);
        navigate('/');
      })
      .catch(err => {
        console.log(err.response.data.message)
        if (err.response && err.response.data.message === 'Email is already in use') {
          setErrorMessage('This email is already registered. Please use a different email.');
        } else {
          setErrorMessage('An error occurred during registration. Please try again.');
        }
      });
  };

  

  return (
    <div className="input-container">
      <div className="register-form">
        <div>
          <label className="register-label">USERNAME</label>
          <br />
          <input
            className="register-input"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label className="register-label">EMAIL</label>
          <br />
          <div >
            <input
              className={`register-input ${emailTouched && !isEmailValid ? 'input-error' : ''}`}
              type="text"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              placeholder="Enter your school email"
            />
            {isEmailValid ? (
              <span className="checkmark">✔️</span>
            ) : (
              emailTouched && <span className="error-text">Email must end with .edu</span>
            )}
          </div>
        </div>
        <div>
          <label className="register-label">PASSWORD</label>
          <br />
          <input
            className="register-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
        </div>
        <div>
          <label className="register-label">RE-ENTER PASSWORD</label>
          <br />
          <input
            className={`register-input ${!doPasswordsMatch ? 'input-error' : ''}`}
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Re-enter your password"
          />
          {!doPasswordsMatch && (
            <span className="error-text">Passwords do not match</span>
          )}
        </div>

        {errorMessage && <p className="error-text">{errorMessage}</p>}

        <button onClick={handleRegister} disabled={!isEmailValid || !doPasswordsMatch}>
          Register
        </button>
      </div>
    </div>
  );
}



export default Registration
