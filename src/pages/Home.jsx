import { useState } from 'react';
import './Home.css';
import Messages from '../Messages';
import Gallery from '../Gallery';


const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='main-layout'>

      <div className={`main-messages ${isOpen ? 'open' : ''}`}>
        <div className='message-header'> 
          Messages 
        </div>
        <Messages />
      </div>

      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="burger"></div>
        <div className="burger"></div>
        <div className="burger"></div>
      </div>

      <div className='line'></div>
      
      <Gallery />
    </div>
  );
};

export default HomePage;
