import React from "react";

import hero from '../../assets/images/hero-image.png';
import aboutImg from '../../assets/images/about-car.png'
//import background from '../assets/images/heroimg.png';
const Home=()=> {
   
      return (
        <div className="main-page">
        <div class="container-outer">
            <section className="hero-section">
        <div className="hero-banner">
          <div className="hero"><img src={hero} className="heri-img" alt="banner" /></div>
          <div class="banner-text">
              <div class="banner-inner-text">
            <h3>Welcome to Travelerz!</h3>
            <h4>book <span>taxi</span> for ride</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <br/> eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div class="banner-buttons">
        <button class="about-me-btn">About Me</button>
        <button class="learn-more-btn">Learn More</button>
        </div>
          
          </div>
        </div>
        </section>
        
        <section className="about-us-section">
        <div className="about">
           <div className="about-left">
            <img src={aboutImg} />
        </div>
        <div className="about-right">
            <div class="about-inner-text">
         <h2>About us</h2>
         <h3>We Provide Trusted <span>Cab</span><br/>
             <span>Service</span> In The World</h3>
         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed <br/> do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><br/>
         <button class="learn-more-btn">Learn More</button>
         </div>
        </div>
        </div><br/><br/>
        </section>
        </div>
        </div>
      );
    };
  
   export default Home; 