// Home.jsx
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // required CSS

const Home = () => {
  return (
    <div>
      <h1>Welcome to AECreations!</h1>

      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={3000}
        showStatus={false}
      >
        <div>
          <img src= "./images/arianna.jpg" alt="Always Cold" />
          <p className="legend">Custom Hats</p>
        </div>
        <div>
          <img src="./images/Wedding.jpg" alt="Party Favors" />
          <p className="legend">Unique Wedding Gifts</p>
        </div>
        <div>
          <img src="./images/chesney.jpg" alt="Company Logos" />
          <p className="legend">Company Logo Hats</p>
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
