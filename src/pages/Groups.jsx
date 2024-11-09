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
                <td><img src={group.profilePicture} alt={group.groupTitle} className="profile-picture"/></td>
                <td>{group.groupTitle}</td>
                <td>{group.rating}</td>
                <td>{group.spotsLeft}</td>
                <td>{group.game}</td>
              </tr>
          ) : (null)
        ))}
      </tbody>
    </table>
  </>
  )
}

export default Groups;