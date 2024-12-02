import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PlanTripPage.css';

const PlanTripPage = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('San Francisco');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartPlanning = () => {
    navigate('/itinerary');
  };

  return (
    <div className="plan-trip-container">
      <h1 className="plan-trip-header">Plan a New Trip</h1>
      <form className="plan-trip-form">
        <div className="form-group">
          <label htmlFor="destination">Where to?</label>
          <select
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            <option>San Francisco</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Dates (optional)</label>
          <div className="date-inputs">
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <button
          type="button"
          className="plan-trip-button"
          onClick={handleStartPlanning}
        >
          Start Planning
        </button>
      </form>
    </div>
  );
};

export default PlanTripPage;
