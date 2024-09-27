import React from 'react';
import { useNavigate } from 'react-router-dom';
import CoverPage from '../components/CoverPage';

const CoverPageView = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/itinerary');
  };

  return <CoverPage onStartClick={handleStartClick} />;
};

export default CoverPageView;