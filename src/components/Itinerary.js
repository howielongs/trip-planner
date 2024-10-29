import React from 'react';
import '../styles/ItineraryPage.css';

const Itinerary = () => {
  const activities = [
    { id: 1, name: "Brunch at 4 Seasons", time: "10:00 AM - 11:30 AM", transport: "Uber (11:45 AM)", completed: true },
    { id: 2, name: "Hike at Mt. Linen", time: "Noon - 2:30 PM", transport: "Train (3:00 PM)", completed: true },
    { id: 3, name: "Shopping & Eating at Valley Fair Mall", time: "3:30 - 5:30 PM", completed: false },
  ];

  return (
    <div className="itinerary-container">
      <header className="header">
        <h1>Itinerary</h1>
        <button className="save-button">Save</button>
      </header>

      <div className="map-section">
        {/* Placeholder for map image */}
        <div className="map-placeholder">Map Placeholder</div>
      </div>

      <div className="summary-section">
        <div className="time-section">
          <label>Time:</label>
          <span>1:00 AM to 6:00 PM</span>
        </div>
        <div className="activities-section">
          <label>Activities:</label>
          <span>3</span>
        </div>
        <button className="create-button">Create Itinerary</button>
      </div>

      <div className="activities-list">
        <h2>Activities (Select once Complete)</h2>
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className="activity-info">
              <span className="activity-icon">📍</span>
              <span className="activity-name">{activity.name}</span>
              <span className="activity-time">({activity.time})</span>
              <span className="activity-transport">{activity.transport}</span>
            </div>
            <div className="activity-select">
              <input
                type="checkbox"
                checked={activity.completed}
                readOnly
              />
            </div>
          </div>
        ))}
      </div>

      <footer className="footer">
        <span>About</span>
        <span>FAQ</span>
        <span>Support</span>
      </footer>
    </div>
  );
};

export default Itinerary;
