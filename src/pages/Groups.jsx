import './Groups.css'
import gameData from '../../backend/mock/gameData.json'

const Groups = (gameName) => {
  
  // delete it in prod  
  gameName = "Valorant";
  return (
  <>
    {images.map((image, index) => (
      <div className="image-container" key={index}>
        <img src={image.image} alt={image.description} className="image"/>
        <a href={image.image} className="link">
          <div className="overlay">
              <div>{image.description}</div>
          </div>
        </a>
      </div>
    ))}
  </>
  )
}

export default Groups;
