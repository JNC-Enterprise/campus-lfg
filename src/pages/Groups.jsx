import './Groups.css'
import images from '../../backend/mock/gameData.json'
import groupsData from "../../backend/mock/groupsData.json"

const Groups = (gameName) => {
  
  // delete it in prod  
  gameName = "Valorant";

  const handleRowClick = () => {
    window.location.href = '.';
  };

  return (
  <>
    {images.map((image, index) => (
      image.description === gameName ? (
          <div key={index} className="game-header">
            <h1 className="game-title">{image.description}</h1>
            <button className="add-group-button">+ Add Group</button>
          </div> 
      ) : (null)
    ))}
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
              <tr key={index} onClick={handleRowClick} className="clickable-row">
                <td data-label="Profile Picture">
                    <img src={group.profilePicture} alt="Profile" className="profile-picture" />
                </td>
                <td data-label="Group Title">{group.title}</td>
                <td data-label="Rating">{group.rating}</td>
                <td data-label="Spots Left">{group.spotsLeft}</td>
                <td data-label="Game Type">{group.gameType}</td>
              </tr>
          ) : (null)
        ))}
      </tbody>
    </table>
  </>
  )
}

export default Groups;