import React, { useState } from 'react';
import '../styles/ItineraryPage.css';
import Sidebar from '../components/Sidebars'; // Import the Sidebar
import MapComponent from '../components/MapComponent'; // Google Maps Component

const Itinerary = ({user}) => {
  const [tripTitle, setTripTitle] = useState('Trip to San Francisco'); // State for the trip title
  const [markers, setMarkers] = useState([]); // State to track map markers

  const handleTitleChange = (e) => {
    setTripTitle(e.target.value);
  };

  // Function to add a marker to the map
  const handleAddMapMarker = (location) => {
    if (typeof location === 'string') {
      // Geocode string address
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          setMarkers((prevMarkers) => [...prevMarkers, { lat: lat(), lng: lng() }]);
        } else {
          console.error('Geocode was not successful for the following reason:', status);
        }
      });
    } else if (location.lat && location.lng) {
      // Add directly if lat/lng is provided
      setMarkers((prevMarkers) => [...prevMarkers, location]);
    }
  };

  return (
    <div className="itinerary-page">
      {/* Sidebar */}
      <Sidebar 
        onAddMapMarker={handleAddMapMarker} 
        user={user} 
      />

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

        <section className="map-section">
          <MapComponent markers={markers} />
        </section>
      </main>
    </div>
  );
};

export default Itinerary;
