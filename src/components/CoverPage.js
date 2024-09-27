import React from 'react';
import '../styles/CoverPage.css';
import logo1 from '../assets/logo1.png';

const CoverPage = ({ onStartClick }) => {
  return (
    <div className="cover-page">
      <div className="cover-left">
        <h1 className="title">Plan Your Trip</h1>
        <button className="start-button" onClick={onStartClick}>
          Get Started
        </button>
      </div>
      <div className="cover-right">
        <img src={logo1} alt="Map logo" className="cover-image" />
      </div>
    </div>
  );
};

export default CoverPage;
