import React from 'react';
import './App.css';
import images from '../backend/gameData.json'

const App = () => {
  return (
    <div className='main-layout'>
      <div className='messages'>
        <div> Messages</div>
        {images.map((image, index) => (
          <div className='message' key={index}>
            <div className="test">hello</div>
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
