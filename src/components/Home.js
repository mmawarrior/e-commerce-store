import React from 'react';
import './Home.css';

const Home = () => {
  const imgSlider = (image) => {
    // Define functionality for image slider
    console.log('Changing image to:', image);
  };

  const changeCircleColor = (color) => {
    // Define functionality to change circle color
    console.log('Changing circle color to:', color);
  };

  return (
    <section className="home-section"> {/* Add a special class name to the section */}
      <div className="circle"></div>  
      <div className="container1">
        <div className="text-box">
          <h2>It's the best store in Europe <br/>Its  <span>Shoetastic</span></h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor modi consequatur nulla, fugit odit rerum quaerat illo at! Nihil velit tempore debitis. Doloribus quasi perspiciatis fuga nulla aspernatur necessitatibus adipisci.</p>
          <a href="/">Learn More</a>
        </div>
        <div className="img-box">
          <img src="img/img1.png" className="starbucks" alt="Starbucks" />
        </div>
      </div>
      <ul className="thumb">
        <li><img src="./img/thumb1.png" alt="Thumbnail 1" onClick={() => imgSlider('img1.png')} /></li>
        <li><img src="./img/thumb2.png" alt="Thumbnail 2" onClick={() => imgSlider('img2.png')} /></li>
        <li><img src="./img/thumb3.png" alt="Thumbnail 3" onClick={() => imgSlider('img3.png')} /></li>
      </ul>
      <ul className="social">
        <li><a href="#"><img src="./img/facebook.png" alt="Facebook" /></a></li>
        <li><a href="#"><img src="./img/instagram.png" alt="Instagram" /></a></li>
        <li><a href="#"><img src="./img/twitter.png" alt="Twitter" /></a></li>
      </ul>
    </section>
  );
};

export default Home;
