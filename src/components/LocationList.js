import React, { useState } from 'react';
import '../styles/LocationList.css';

const LocationList = ({ suggestions, onAddLocation }) => {
  const [newLocation, setNewLocation] = useState('');

  const handleAddLocation = () => {
    if (newLocation.trim()) {
      onAddLocation(newLocation);
      setNewLocation('');
    }
  };

  return (
    <div className="location-list-container">
      <h2 className="location-list-header">Places to Visit</h2>
      <div className="suggested-locations">
        <h3>Suggested Locations</h3>
        <ul>
          {suggestions.map((location, index) => (
            <li key={index} className="suggested-location-item">
              <span>{location}</span>
              <button className="add-location-button" onClick={() => onAddLocation(location)}>
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="manual-add-location">
        <h3>Add a New Location</h3>
        <input
          type="text"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          placeholder="Enter location name"
          className="location-input"
        />
        <button className="add-location-button" onClick={handleAddLocation}>
          Add Location
        </button>
      </div>
    </div>
  );
};

export default LocationList;
