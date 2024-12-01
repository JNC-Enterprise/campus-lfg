import './GroupCreation.css'
import React, { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

function GroupCreation({ toggleVisibility, defaultGame }) {
  const [groupTitle, setGroupTitle] = useState('');
  const [selectedGame, setSelectedGame] = useState(defaultGame || 'SELECT GAME');
  const [numPlayers, setNumPlayers] = useState('?');
  const [groupGamemode, setGamemode] = useState('SELECT MODE');
  const [userRank, setUserRank] = useState('SELECT RANK');

  // Define rank options for each game
  const rankOptions = {
    "Valorant": ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Immortal", "Radiant"],
    "Overwatch": ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster"],
    "Rainbow Six Siege": ["Copper", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Champion"],
    "Fortnite": ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Elite", "Champion", "Unreal"],
    "Apex Legends": ["Rookie", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Apex Predator"],
    "Genshin Impact": ["N/A"],
    "Minecraft":["N/A"],
    "Team Fortress 2": ["Mercenary", "Contract Killer" ,"Executioner", "Expert Assasin", "Death Merchant"],
    "Counter Strike": ["Gray", "Light Blue", "Blue", "Purple", "Pink", "Red", "Gold"],
    "Spellbreak": ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Legend"],
    "PUBG": ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Crown", "Ace", "Conqueror"],
    "Call of Duty": ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Crimson", "Iridescent", "Top 250"],
    // Add more games with specific ranks as needed
  };

  // Define Gamemode options for each game
  const gamemodeOptions = {
    "Valorant": ["Unrated", "Competitive", "Swiftplay", "Spike Rush", "Premier", "Deathmatch", "Team Deathmatch"],
    "Overwatch": ["Competitive", "Deathmatch", "Capture the Flag", "PVE", "Limited Time Event"],
    "Rainbow Six Siege": ["Competitive", "Quick Match", "Standard", "Hostage", "Bomb"],
    "Fortnite": ["Competitive (Build)", "Competitive (No Build)", "Unrated (Build)", "Unrated (No Build)", "Creative", "Team Rumble", "Lego Fortnite", "Save the World"],
    "Apex Legends": ["Battle Royale", "Ranked", "Control", "Gun Run", "Team Deathmatch"],
    "Genshin Impact": ["Multiplayer"],
    "Minecraft": ["Vanilla Minecraft", "Modded Minecraft", "Server Minigames"],
    "Team Fortress 2": ["Casual", "Competitive", "Mann vs Machine", "Custom Server"],
    "Counter Strike": ["Premier", "Deathmatch", "Casual", "Third Party Competitive", "Custom Server Game"],
    "Spellbreak": ["Battle Royale (Casual)", "Battle Royale (Competitive)", "Dominion"],
    "PUBG": ["Classic (Competitive)", "Classic (Casual)", "Arcade", "Team Deathmatch"],
    "Call of Duty": ["Quick Play", "Competitive", "Hardcore"]
  };

  // Define # of players for each game
  const playersOptions = {
    "Valorant": [1, 2, 3, 4],
    "Overwatch": [1, 2, 3, 4],
    "Rainbow Six Siege": [1, 2, 3, 4],
    "Fortnite": [1, 2, 3],
    "Apex Legends": [1, 2],
    "Genshin Impact": [1, 2, 3],
    "Minecraft": [1, 2, 3, 4, 5, 6],
    "Team Fortress 2": [1, 2, 3, 4, 5],
    "Counter Strike": [1, 2, 3, 4],
    "Spellbreak": [1, 2, 3],
    "PUBG": [1, 2, 3],
    "Call of Duty": [1, 2, 3, 4, 5]
  };
  


  const handleSelect = (game) => {
    setSelectedGame(game);
    setUserRank('SELECT RANK'); // Reset rank when the game changes
  };

  const handleRank = (rank) => {
    setUserRank(rank);
  };

  const handlePlayers = (players) => {
    setNumPlayers(players);
  };

  const handleGamemode = (gamemode) => {
    setGamemode(gamemode);
  };

  const groupTitleChange = (e) => {
    setGroupTitle(e.target.value);
  };

  return (
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
        
        {/* Rank Dropdown */}
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" className="group-dropdown-custom">
            {userRank}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {rankOptions[selectedGame]?.map((rank, index) => (
              <Dropdown.Item key={index} onClick={() => handleRank(rank)}>
                {rank}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" className="group-dropdown-custom">
            {groupGamemode}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {gamemodeOptions[selectedGame]?.map((gamemode, index) => (
              <Dropdown.Item key={index} onClick={() => handleGamemode(gamemode)}>
                {gamemode}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" className="group-dropdown-custom">
            # OF PLAYERS: {numPlayers}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {playersOptions[selectedGame]?.map((players, index) => (
              <Dropdown.Item key={index} onClick={() => handlePlayers(players)}>
                {players}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <input className="group-title" type="text" value={groupTitle} onChange={groupTitleChange} placeholder='<ENTER GROUP TITLE>' />
        <button className='group-done-button' onClick={toggleVisibility}>
          DONE
        </button>
      </div>
    </div>
  );
}

export default GroupCreation;
