import React, { useState, useRef } from 'react';
import '../styles/Sidebars.css';
import fisherman from '../assets/fisher.png';
import bridge from '../assets/bridge.png';
import prison from '../assets/alcatraz.png';
import location1 from '../assets/location1.png';
import location2 from '../assets/location2.png';
import location3 from '../assets/location3.png';

const Sidebars = ({ onAddMapMarker }) => {
  const [selectedTab, setSelectedTab] = useState('Explore');
  const [placesToVisit, setPlacesToVisit] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [tripName, setTripName] = useState('');
  const [savedTrips, setSavedTrips] = useState([]);
  const [notes, setNotes] = useState('');
  const [suggestedLocations, setSuggestedLocations] = useState([
    {
      id: 1,
      image: fisherman,
      title: "Fisherman's Wharf",
      description: 'Bustling waterfront area with restaurants and shopping.',
      location: { lat: 37.808, lng: -122.417 }, // Add valid latitude and longitude
    },
    {
      id: 2,
      image: bridge,
      title: 'Golden Gate Bridge',
      description: 'Vantage point offering stunning views.',
      location: { lat: 37.8199, lng: -122.4783 },
    },
    {
      id: 3,
      image: prison,
      title: 'Alcatraz Island',
      description: 'Notorious former prison with historic tours.',
      location: { lat: 37.8267, lng: -122.423 },
    },
  ]);

  const autocompleteRef = useRef(null);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry && place.geometry.location) {
      const { lat, lng } = place.geometry.location;
      const newPlace = {
        id: Date.now(),
        title: place.formatted_address,
        image: '',
        description: '',
        location: { lat: lat(), lng: lng() },
      };
      setPlacesToVisit((prev) => [...prev, newPlace]);
      onAddMapMarker({ lat: lat(), lng: lng() });
      setSearchInput('');
    } else {
      console.error('Place does not have geometry or location data');
    }
  };

  const handleSearchAdd = () => {
    if (searchInput.trim()) {
      const newPlace = { id: Date.now(), title: searchInput, image: '', description: '' };
      setPlacesToVisit((prev) => [...prev, newPlace]);
      setSearchInput('');
    }
  };

  const handleSaveTrip = () => {
    if (tripName.trim() && placesToVisit.length > 0) {
      const newTrip = {
        id: Date.now(),
        name: tripName,
        places: [...placesToVisit],
      };
      setSavedTrips((prev) => [...prev, newTrip]);
      setTripName('');
      setPlacesToVisit([]);
      alert('Trip saved successfully!');
    } else {
      alert('Please enter a trip name and add at least one place.');
    }
  };

  const handleAddPlace = (place) => {
    setPlacesToVisit((prev) => [...prev, place]);
    setSuggestedLocations((prev) => prev.filter((item) => item.id !== place.id));
    onAddMapMarker(place.location || {});
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'Explore': {
        const exploreItems = [
          {
            image: location1,
            title: 'Top places for San Francisco',
            description: 'Most often-seen on the web',
          },
          {
            image: location2,
            title: 'Best restaurants in San Francisco',
            description: 'Most often-seen on the web',
          },
          {
            image: location3,
            title: 'Search hotels with transparent pricing',
            description: "Unlike most sites, we don’t sort based on commissions",
          },
        ];

        return (
          <div className="explore-grid">
            {exploreItems.map((item, index) => (
              <div key={index} className="explore-card">
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        );
      }

      case 'Places to Visit': {
        return (
          <div className="places-to-visit-container">
            <div className="search-bar">
              <input
                type="text"
                ref={(ref) => {
                  if (ref && window.google) {
                    const autocomplete = new window.google.maps.places.Autocomplete(ref, {
                      types: ['geocode'],
                    });
                    autocomplete.setFields(['formatted_address', 'geometry']);
                    autocomplete.addListener('place_changed', () => {
                      autocompleteRef.current = autocomplete;
                      handlePlaceSelect();
                    });
                  }
                }}
                placeholder="Search or add a location"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button onClick={handleSearchAdd}>Add</button>
            </div>

            <div className="places-list">
              <h3>Your Places to Visit</h3>
              {placesToVisit.map((place) => (
                <div key={place.id} className="place-item">
                  <p>{place.title}</p>
                </div>
              ))}
            </div>

            <div className="save-trip-section">
              <h3>Save Trip</h3>
              <input
                type="text"
                placeholder="Enter trip name"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
              />
              <button onClick={handleSaveTrip}>Save Trip</button>
            </div>

            <div className="recommended-places">
              <h3>Recommended Places</h3>
              <div className="carousel">
                {suggestedLocations.map((location) => (
                  <div key={location.id} className="carousel-item">
                    <img src={location.image} alt={location.title} />
                    <div className="carousel-info">
                      <p>{location.title}</p>
                      <p>{location.description}</p>
                      <button onClick={() => handleAddPlace(location)}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      case 'Itinerary': {
        return (
          <div className="itinerary-section">
            <h3>Your Itineraries</h3>
            {savedTrips.map((trip) => (
              <div key={trip.id} className="saved-trip-item">
                <h4>{trip.name}</h4>
                <ul>
                  {trip.places.map((place) => (
                    <li key={place.id}>{place.title}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      }

      case 'Notes': {
        return (
          <div className="notes-content">
            <h3>Your Notes</h3>
            <textarea
              placeholder="Write your notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="10"
              style={{
                width: '100%',
                borderRadius: '5px',
                padding: '10px',
                border: '1px solid #ddd',
                backgroundColor: '#3e3b57',
                color: '#e5e5f7',
              }}
            />
          </div>
        );
      }

      default:
        return <div>{selectedTab} content goes here...</div>;
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-nav">
        <div
          className={`nav-item ${selectedTab === 'Explore' ? 'active' : ''}`}
          onClick={() => setSelectedTab('Explore')}
        >
          Explore
        </div>
        <div
          className={`nav-item ${selectedTab === 'Places to Visit' ? 'active' : ''}`}
          onClick={() => setSelectedTab('Places to Visit')}
        >
          Places to Visit
        </div>
        <div
          className={`nav-item ${selectedTab === 'Itinerary' ? 'active' : ''}`}
          onClick={() => setSelectedTab('Itinerary')}
        >
          Itinerary
        </div>
        <div
          className={`nav-item ${selectedTab === 'Notes' ? 'active' : ''}`}
          onClick={() => setSelectedTab('Notes')}
        >
          Notes
        </div>
      </div>
      <div className="sidebar-content">
        <div className="scrollable-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Sidebars;
