import React from 'react';
import '../styles/ItineraryPage.css';  // Style the itinerary page here
import MapComponent from '../components/MapComponent';  // Import the new map component

const ItineraryView = () => {
  return (
    <div className="itinerary-container">
      <div className="left-panel">
        <h2>Your Plan <span className="edit-icon">✎</span></h2>

        <div className="event-details">
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
            <p><span className="info-icon">ℹ️</span> This is an example event! You can rename the event by clicking the edit icons, add a desired location, or input your itinerary times!</p>
          </div>
        </div>

        <button className="add-event-button">Add a new event</button>
      </div>

      <div className="right-panel">
        <MapComponent />  {/* Replaces the placeholder with the actual map */}
      </div>
    </div>
  );
};

export default ItineraryView;
