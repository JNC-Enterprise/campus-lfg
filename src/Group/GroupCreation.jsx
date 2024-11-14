import './GroupCreation.css'
import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

function GroupCreation({ toggleVisibility, defaultGame}) {
  const [groupTitle, setGroupTitle] = useState('');
  const [selectedGame, setSelectedGame] = useState(defaultGame || 'SELECT GAME');
  const [numPlayers, setNumPlayers] = useState('?');
  const [groupGamemode, setGamemode] = useState('SELECT MODE');
  const [userRank, setUserRank] = useState('SELECT RANK');

  const groupTitleChange = (e) => {
    setGroupTitle(e.target.value);
  };

  const handleSelect = (game) => {
    setSelectedGame(game);
  };

  const handlePlayers = (players) => {
    setNumPlayers(players);
  };

  const handleGamemode = (groupGamemode) => {
    setGamemode(groupGamemode);
  };

  const handleRank = (userRank) => {
    setUserRank(userRank);
  };

  const gameSelectedCheck = (e) => {
    if(selectedGame === 'SELECT GAME') {
      e.preventDefault();
      alert('Please select a game first!');
    }
  };

  const handleGroupCreation = (e) => {
    // Group creation logic here
  };

  return(
    <div>
      <div className='group-creation-container'>
        <button className='group-creator-text'>
          CREATE GROUP
        </button>
        <button onClick={toggleVisibility} className='close-button'>
          X
        </button>
        <div className="group-game">
          {selectedGame}
        </div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" className="group-dropdown-custom">
            {userRank}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleRank('Immortal 3')}>Immortal 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" className="group-dropdown-custom">
            {groupGamemode}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleGamemode("Unrated")}>Unrated</Dropdown.Item>
            <Dropdown.Item onClick={() => handleGamemode("Deathmatch")}>Deathmatch</Dropdown.Item>
            <Dropdown.Item onClick={() => handleGamemode("Swiftplay")}>Swiftplay</Dropdown.Item>
            <Dropdown.Item onClick={() => handleGamemode("Spike Rush")}>Spike Rush</Dropdown.Item>
            <Dropdown.Item onClick={() => handleGamemode("Competitive")}>Competitive</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" className="group-dropdown-custom">
            # OF PLAYERS: {numPlayers}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handlePlayers(2)}>2</Dropdown.Item>
            <Dropdown.Item onClick={() => handlePlayers(3)}>3</Dropdown.Item>
            <Dropdown.Item onClick={() => handlePlayers(4)}>4</Dropdown.Item>
            <Dropdown.Item onClick={() => handlePlayers(5)}>5</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <input className="group-title" type="text" value={groupTitle} onChange={groupTitleChange} placeholder='<ENTER GROUP TITLE>'/>
        <button className='group-done-button' onClick={toggleVisibility}>
          DONE
        </button>
      </div>
    </div>
  );
};

export default GroupCreation;
