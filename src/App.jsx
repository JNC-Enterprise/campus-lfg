import React from 'react';
import './App.css';
import images from './data/gameData.json'

const App = () => {
  return (
    <div className='main-layout'>
      <div className='messages'>
        <div> Messages</div>
      </div>
      <div className='vertical'></div>
      <div className="gallery">
        {images.map((image, index) => (
          <div className="image-container" key={index}>
            <img src={image.url} alt={image.description} className="image"/>
            <a href="https://jatinsuri.com/">
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
