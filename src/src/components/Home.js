import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="landing-page">
      <div className="darkened-overlay"></div> {/* Add a div for the darkened overlay */}
      <img src="/img/image7.png" alt="Random Image" />
      <div className="overlay-text">Welcome</div>
    </div>
  );
};

export default Home;
