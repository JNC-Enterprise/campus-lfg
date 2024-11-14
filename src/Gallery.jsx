import "./Gallery.css";
import { Link } from 'react-router-dom';
import gameImages from '../backend/mock/gameData.json';

const Gallery = () => (
  <div className="gallery">
    {gameImages.map((game, index) => (
      <Link key={index} to={`/groups/${game.description}`} className="image-container">
        <img src={game.image} alt={game.description} className="image" />
        <div className="overlay">
          <p className="overlay-text">{game.description}</p>
        </div>
      </Link>
    ))}
  </div>
);

export default Gallery;