import { useState } from 'react';
import './App.css';
import './Login.css';
import GroupCreation from './Group/GroupCreation.jsx'

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return <GroupCreation />;
};

export default App;