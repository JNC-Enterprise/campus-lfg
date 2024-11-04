import { useState } from 'react';
import './App.css';
import './pages/Login.css';
import Login from './pages/Login.jsx';
import Messages from './Messages';
import Gallery from './Gallery';

const App = () => {
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
      
      <div>
        <Login />
      </div>
    </div>
  );
};

export default App;
