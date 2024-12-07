import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CoverPage.css';
import logo2 from '../assets/logo2.png';

const CoverPage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/plan'); // Redirect to the Plan Trip Page
  };

  return (
    <div className="cover-page">
      <div className="cover-left">
        <h1 className="title">Plan Your Trip</h1>
        <p className="description">Seamlessly create an itinerary for your next adventure!</p>
        <button className="start-button" onClick={handleStartClick}>
          Get Started
        </button>
      </div>
      <div className="cover-right">
        <img src={logo2} alt="Map logo" className="cover-image" />
      </div>
    </div>
  );
};

export default CoverPage;
