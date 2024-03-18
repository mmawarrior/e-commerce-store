// Home.js
import React from 'react';
import './Home.css';

const Home = () => {
  const getRandomImage = () => {
    // Generate a random number between 1 and 1000
    const randomImageNumber = Math.floor(Math.random() * 1000) + 1;
    // Use a placeholder image URL with the random number
    return `https://picsum.photos/800/600?random=${randomImageNumber}`;
  };

  return (
    <div className="landing-page">
      <div className="darkened-overlay"></div> {/* Add a div for the darkened overlay */}
      <img src={getRandomImage()} alt="Random Image" />
      <div className="overlay-text">Welcome</div>
    </div>
  );
};

export default Home;
