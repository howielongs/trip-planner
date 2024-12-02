import React from 'react';
import '../styles/SuggestPlaces.css';

const SuggestPlaces = ({ suggestions, onAddToItinerary }) => {
  return (
    <div className="suggest-places-container">
      <h2 className="suggest-places-header">Explore Suggested Places</h2>
      <div className="places-grid">
        {suggestions.map((place, index) => (
          <div key={index} className="place-card">
            <div className="place-info">
              <h3 className="place-name">{place.name}</h3>
              <p className="place-address">{place.address}</p>
              <p className="place-tags">{place.tags}</p>
            </div>
            <button
              className="add-to-itinerary-button"
              onClick={() => onAddToItinerary(place)}
            >
              Add to Itinerary
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestPlaces;
