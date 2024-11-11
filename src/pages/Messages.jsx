import React, { useState } from 'react';
import './Messages.css';
import messages from '../../backend/mock/messages.json';

const Messages = () => {
  const [showOverlay, setshowOverlay] = useState(false);

  const handlePopOut = (e) => {
    e.preventDefault();
    setshowOverlay(true);
  };

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = () => {
    console.log(inputValue);
    setInputValue(''); // Clear the input value
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleInputSubmit();
    }
  };

  return (
    <div className='messages'>
      {messages.map((message, index) => (
        <a className='actual-messages' key={index} onClick={handlePopOut}>
          <img src={message.profile} className='profile-pic' alt="Profile" />
          <div className='message-text'>
            <b>{message.groupName}</b>
            <div>{message.message}</div>
          </div>
        </a>
      ))}

      {showOverlay && (
        <div className='message-overlay'>
          <div className='cross-exit'>
            <button className='cross-exit-button' onClick={() => setshowOverlay(false)}>X</button>
          </div>
          <div className='message-box'>
            <input
              className='input-box'
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;