import React, { useState } from 'react';
import '../styles/ItineraryPage.css';
import Sidebar from '../components/Sidebars'; // Import the Sidebar
import MapComponent from '../components/MapComponent'; // Google Maps Component

const Itinerary = () => {
  const [tripTitle, setTripTitle] = useState('Trip to San Francisco'); // State for the trip title
  const [activities, setActivities] = useState([
    { id: 1, name: "Brunch at 4 Seasons", time: "10:00 AM - 11:30 AM", transport: "Uber", completed: true },
    { id: 2, name: "Hike at Mt. Tam", time: "12:00 PM - 2:30 PM", transport: "Train", completed: true },
    { id: 3, name: "Shopping at Valley Fair", time: "3:00 PM - 5:30 PM", completed: false },
  ]);

  const handleTitleChange = (e) => {
    setTripTitle(e.target.value);
  };

  const handleActivityChange = (id) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === id ? { ...activity, completed: !activity.completed } : activity
      )
    );
  };

  return (
    <div className="itinerary-page">
      {/* Sidebar */}
      <Sidebar locations={activities.map((activity) => activity.name)} />

      {/* Main Content */}
      <main className="main-content">
        <header className="itinerary-header">
          {/* Editable Trip Title */}
          <input
            type="text"
            value={tripTitle}
            onChange={handleTitleChange}
            className="trip-title-input"
          />
          <button className="add-dates-button">Add Trip Dates</button>
        </header>

        <section className="activities-section">
          <h2>Your Itinerary</h2>
          {activities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <span>{activity.name}</span>
              <span>{activity.time}</span>
              <span>{activity.transport}</span>
              <input
                type="checkbox"
                checked={activity.completed}
                onChange={() => handleActivityChange(activity.id)}
              />
            </div>
          ))}
        </section>

        <section className="map-section">
          <MapComponent />
        </section>
      </main>
    </div>
  );
};

export default Itinerary;
