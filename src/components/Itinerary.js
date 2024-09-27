import React from 'react';
import '../styles/ItineraryPage.css';
const Itinerary = () => {
  return (
    <div className="itinerary-event">
      <div className="event-time">
        <label>Start Time</label>
        <input type="time" value="12:39 pm" />
      </div>
      <div className="event-time">
        <label>End Time</label>
        <input type="time" value="12:39 pm" />
      </div>
      <div className="event-info">
        <h3>Tutorial Event <span className="edit-icon">✎</span></h3>
        <p><span className="location-icon">📍</span> <a href="#">Add a location</a></p>
      </div>
    </div>
  );
};

export default Itinerary;
