import React, { useState } from 'react';
import './App.css';
import Messages from './Messages';
import images from '../backend/gameData.json'

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='main-layout'>

      <div className={`main-messages ${isOpen ? 'open' : ''}`}>
      <div className='message-header'>Messages</div>
        <Messages />
      </div>

      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="burger"></div>
        <div className="burger"></div>
        <div className="burger"></div>
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
