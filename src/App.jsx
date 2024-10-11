import React from 'react';
import './App.css';
import images from '../backend/gameData.json'
import messages from '../backend/messages.json'

const App = () => {
  return (
    <div className='main-layout'>
      <h1 className='message-header'>Messages</h1>
      <div className='messages'>
        {messages.map((messages, index) => (
          <div className='actual-messages' key={index}>
            <img src={messages.profile} className='profile-pic' />
            <div className='message-text'>
              <div>{messages.groupName}</div>
              <div>{messages.message}</div>
            </div>
          </div>
        ))}
      </div>
      <div className='line'></div>
      
      <div className="gallery">
        {images.map((image, index) => (
          <div className="image-container" key={index}>
            <img src={image.image} alt={image.description} className="image"/>
            <a href={image.image} className="link">
              <div className="overlay">
                  <div>{image.description}</div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
