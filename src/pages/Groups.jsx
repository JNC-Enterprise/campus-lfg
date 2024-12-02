import './Groups.css'
import { useParams } from 'react-router-dom';
import GroupCreation from "../Group/GroupCreation.jsx"
import Navbar from './Navbar.jsx';
import React, { useState, useEffect } from 'react';

const Groups = () => {
  const { gameName } = useParams();
  const [groupsData, setGroupsData] = useState([]); // State for groups data
  const [isVisible, setIsVisible] = useState(false); // State for popup visibility
  const [loading, setLoading] = useState(true); // State for loading spinner
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // Fetch gameId based on gameName
        const gameResponse = await fetch(`/api/games/${gameName}`); // Assuming this endpoint returns the game ID
        const gameData = await gameResponse.json();
  
        if (gameData && gameData.game_id) {
          const gameId = gameData.game_id;
  
          // Now fetch groups for the specific gameId
          const groupsResponse = await fetch(`/api/groups/${gameId}`);
          if (groupsResponse.ok) {
            const data = await groupsResponse.json();
            setGroupsData(data); // Set fetched groups data
          } else {
            setError('Failed to fetch groups');
          }
        } else {
          setError('Game not found');
        }
      } catch (err) {
        setError('An error occurred while fetching groups');
      } finally {
        setLoading(false);
      }
    };
  
    fetchGroups();
  }, [gameName]);
  

  // Toggle the visibility of the GroupCreation popup
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Redirect to individual group pages
  const handleRowClick = (group) => {
    window.location.href = `/group/${group.group_id}`;
  };


  return (
    <div>
      <Navbar/>
    <div className="groups-container">
      {/* Game Header */}
      <div className="game-header">
        <h1 className="game-title">{gameName}</h1>
        <button className="add-group-button" onClick={toggleVisibility}>
          + Add Group
        </button>
      </div>

      {/* Group Creation Popup */}
      {isVisible && <GroupCreation toggleVisibility={toggleVisibility} defaultGame={gameName}/>}

      {/* Loading Indicator */}
      {loading && <div className="loading">Loading groups...</div>}

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Groups Table */}
      {!loading && !error && groupsData.length > 0 && (
        <table className="groups-table">
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Number of Members</th>
              <th>Game Title</th>
            </tr>
          </thead>
          <tbody>
            {groupsData.map((group) => (
              <tr key={group.group_id} onClick={() => handleRowClick(group)} className="clickable-row">
                <td data-label="Group Name">{group.group_name}</td>
                <td data-label="Number of Members">{group.num_members}</td>
                <td data-label="Game Title">{group.game_title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* No Groups Found */}
      {!loading && !error && groupsData.length === 0 && (
        <div className="no-groups">No groups found for this game. Be the first to create one!</div>
      )}
    </div>
    </div>

  );
};

export default Groups;
