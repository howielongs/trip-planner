import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PlanTripPage.css';

const PlanTripPage = ({onIntineraryChange}) => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('San Francisco');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [itinerary, setIntinerary] = useState(null);

  useEffect(() => {
    if (onIntineraryChange) {
      onIntineraryChange(itinerary); 
    }
  }, [itinerary, onIntineraryChange]);


const handleStartPlanning = () => {
  const formattedStartDate = startDate
    ? new Date(startDate).toISOString().split('T')[0]
    : null; 

  const newitinerary = {
    startDate: formattedStartDate,
    itinerary_id: null,
  };
  setIntinerary(newitinerary);
  console.log(itinerary);
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
