import './Groups.css'
import { useParams } from 'react-router-dom';
import images from '../../backend/mock/gameData.json'
import groupsData from "../../backend/mock/groupsData.json"
import GroupCreation from "../Group/GroupCreation.jsx"
import React, { useState } from 'react';

const Groups = () => {
  const { gameName } = useParams();
  const gameImage = images.find(image => image.description === gameName);

  // Manage visibility of the GroupCreation component
  const [isVisible, setIsVisible] = useState(false);

  // Toggle the visibility of the GroupCreation popup
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleRowClick = (group) => {
    window.location.href = `/group/${group.groupId}`;
  };

  return (
    <>
      {images.map((image, index) => (
        image.description === gameName ? (
          <div key={index} className="game-header">
            <h1 className="game-title">{image.description}</h1>
            <button className="add-group-button" onClick={toggleVisibility}>
              + Add Group
            </button>
          </div>
        ) : null
      ))}

      {isVisible && <GroupCreation toggleVisibility={toggleVisibility} />}

      <table>
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Group Title</th>
            <th>Rating</th>
            <th>Spots Left</th>
            <th>Type of Game</th>
          </tr>
        </thead>
        <tbody>
          {groupsData.map((group, index) => (
            group.game === gameName ? (
              <tr key={index} onClick={() => handleRowClick(group)} className="clickable-row">
                <td data-label="Profile Picture">
                  <img src={group.profilePicture} alt="Profile" className="profile-picture" />
                </td>
                <td data-label="Group Title">{group.groupTitle}</td>
                <td data-label="Rating">{group.rating}</td>
                <td data-label="Spots Left">{group.spotsLeft}</td>
                <td data-label="Game Type">{group.game}</td>
              </tr>
            ) : null
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Groups;
