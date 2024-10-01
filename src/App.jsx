import React from 'react';
import './App.css';

const App = () => {
  const images = [
    {url: 'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2020/03/valorant-logo.jpg', description: "Valorant" },
    {url:'https://static.wikia.nocookie.net/overwatch_gamepedia/images/6/67/Flag_of_Overwatch.png', description: "Overwatch"},
    {url: 'https://i.pinimg.com/736x/c6/d2/95/c6d295161b2e7df93e64333b1cf5f69c.jpg', description: "Rainbow Six Siege" },
    {url: 'https://img.asmedia.epimg.net/resizer/v2/CEGMVQI3OBCDTMHAVG6YBNPFTA.jpg?auth=7a0bc09bcc54b3a11d36beb97d475bc46307dfc96d75869ef522738094ccf46e&width=1472&height=828&smart=true', description: "Fortnite" },
    {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdVl4w8bW6Pb0-_c_hvJVZO2IbinoF41gNzA&s', description: "Apex Legends" },
    {url: 'https://cdn2.steamgriddb.com/logo/2465517595f5ea9f225d52ed73a4d0db.png', 'description': "Genshin Impact" },
    {url: 'https://logos-world.net/wp-content/uploads/2020/05/Minecraft-Logo.png', description: "Minecraft" },
    {url: 'https://logos-world.net/wp-content/uploads/2023/02/TF2-Emblem.png', description: "Team Fortress 2" },
    {url: 'https://images.seeklogo.com/logo-png/53/1/counter-strike-2-logo-png_seeklogo-534313.png', description: "Counter Strike" },
    {url: 'https://image.api.playstation.com/gs2-sec/appkgo/prod/CUSA18527_00/4/i_0d710d7c6cfae7a13eea6a4c72f812c6adc4a50994f00541702a7dcd2aa3741d/i/icon0.png', description: "Spellbreak" },
    {url:'https://static.cdnlogo.com/logos/p/57/pubg.png', description: "PUBG"},
    {url:'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/04/call-of-duty-logo.jpg', description: "Call of Duty"},
  ];

  return (
    <div className='main-layout'>
      <div className='messages'>
        <div> Messages</div>
      </div>
      <div className='vertical'></div>
      <div className="gallery">
        {images.map((image, index) => (
          <div className="image-container" key={index}>
            <img src={image.url} alt={`Image ${index + 1}`} className="image" />
            <div className="overlay">
              <div>{image.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
