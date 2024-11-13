import './GroupCreation.css'
// Throwing this error "useNavigate() may be used only in the context of a <Router> component"
// import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

function GroupCreation() {
  // const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [groupTitle, setGroupTitle] = useState('');
  const [selectedGame, setSelectedGame] = useState('SELECT GAME');
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
  
  // This stopped the drop down from working properly
  const gameSelectedCheck = (e) => {
    if(selectedGame == 'SELECT GAME'){
      e.preventDefault();
      alert('Please select a game first!');
    }else{

    }
  };

  // Toggle visibility of the group creation screen
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Need more logic here.
  // After logic group should be created in the database.
  const handleGroupCreation = (e) => {
    // Should navigate to the group menu of whatever game the user chose.
    //navigate('/')
  }
  return(
    <div>
      {isVisible && (
        <div className='group-creation-container'>
          
          <button /*onClick={}*/ className='group-creator-text'>
          CREATE GROUP
          </button>
          <button onClick={toggleVisibility} className='close-button'>
            X
          </button>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic" className="group-dropdown-custom">
              {selectedGame}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSelect('VALORANT')}>VALORANT</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect('Overwatch 2')}>Overwatch 2</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect('Rainbow Six Siege')}>Rainbox Six Siege</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect('Fortnite')}>Fortnite</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect('Genshin Impact')}>Genshin Impact</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect('Minecraft')}>Minecraft</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect('Team Fortress 2')}>Team Fortress 2</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect('Counter Strike 2')}>Counter Strike 2</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect('Spellbreak')}>Spellbreak</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect('PUBG')}>PUBG</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect('Call of Duty')}>Call of Duty</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
      )}
    </div>
  );
};

export default GroupCreation;