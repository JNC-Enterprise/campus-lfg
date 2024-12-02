import React from 'react';
import './AboutUs.css';
import Navbar from "./Navbar.jsx";

const About = () => {
    return (
      <div>
        <Navbar />
        <div className="about-container">
            <h1 className="about-heading">About Us</h1>
            <div className="about-box">
              <p className="about-text">Name: Jatin Suri</p>
              <p className="about-text">
                  GitHub: <a href="https://github.com/jatinsu" target="_blank" rel="noopener noreferrer">jatinsu</a>
              </p>
              <p className="about-text">
                  Email: <a href="mailto:surijatin@yahoo.com">surijatin@yahoo.com</a>
              </p>
            </div>
            <div className="about-box">
              <p className="about-text">Name: Christian Walker</p>
              <p className="about-text">
                  GitHub: <a href="https://github.com/cwalke6" target="_blank" rel="noopener noreferrer">cwalke6</a>
              </p>
              <p className="about-text">
                  Email: <a href="mailto:cwalker6@umbc.edu">cwalker6@umbc.edu</a>
              </p>
            </div>
            <div className="about-box">
              <p className="about-text">Name: Nicholas Agouridis</p>
              <p className="about-text">
                  GitHub: <a href="https://github.com/Nagouridis" target="_blank" rel="noopener noreferrer">Nagouridis</a>
              </p>
              <p className="about-text">
                  Email: <a href="mailto:nagouri1@umbc.edu">nagouri1@umbc.edu</a>
              </p>
            </div>
        </div>
      </div>
    );
};

export default About;
