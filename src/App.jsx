import React from 'react';
import './App.css';
import images from './data/gameData.json'

const App = () => {
  return (
    <div className='main-layout'>
      <div className='messages'>
        <div> Messages</div>
      </div>
      <div className='line'></div>
      <div className="gallery">
        {images.map((image, index) => (
          <div className="image-container" key={index}>
            <img src={image.url} alt={image.description} className="image"/>
            <a href={image.url} className="link">
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
