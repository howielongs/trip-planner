import React, { useState, useRef } from 'react';
import '../styles/Sidebars.css';

const Sidebars = ({ onAddMapMarker }) => {
  const [selectedTab, setSelectedTab] = useState('Explore');
  const [placesToVisit, setPlacesToVisit] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // Suggested Locations Data
  const initialSuggestedLocations = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      title: "Fisherman's Wharf",
      description: 'Bustling waterfront area with restaurants and shopping.',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      title: 'Golden Gate Bridge',
      description: 'Vantage point offering stunning views.',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150',
      title: 'Alcatraz Island',
      description: 'Notorious former prison with historic tours.',
    },
  ];
  const [suggestedLocations, setSuggestedLocations] = useState(initialSuggestedLocations);

  const autocompleteRef = useRef(null);

  // Handle place selection from Google Places Autocomplete
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
  
      setPlacesToVisit((prev) => [...prev, newPlace]); // Add to Places to Visit
      onAddMapMarker({ lat: lat(), lng: lng() }); // Add marker to the map
      setSearchInput(''); // Clear the search input
    } else {
      console.error('Place does not have geometry or location data');
    }
  };

  // Add a custom place through the search bar
  const handleSearchAdd = () => {
    if (searchInput.trim()) {
      const newPlace = { id: Date.now(), title: searchInput, image: '', description: '' };
      setPlacesToVisit((prev) => [...prev, newPlace]);
      setSearchInput('');
      onAddMapMarker(searchInput); // Add the location to the map
    }
  };

  const handleAddPlace = (place) => {
    setPlacesToVisit((prev) => [...prev, place]);
    setSuggestedLocations((prev) => prev.filter((item) => item.id !== place.id));
    onAddMapMarker(place.title); // Add marker to map
  };

  const handleDeletePlace = (place) => {
    setPlacesToVisit((prev) => prev.filter((item) => item.id !== place.id));
    if (suggestedLocations.every((item) => item.id !== place.id)) {
      setSuggestedLocations((prev) => [...prev, place]);
    }
  };


  // Render the content for the selected tab
  const renderContent = () => {
    switch (selectedTab) {
      case 'Explore': {
        const exploreItems = [
          {
            image: 'https://via.placeholder.com/150',
            title: 'Top places for San Francisco',
            description: 'Most often-seen on the web',
          },
          {
            image: 'https://via.placeholder.com/150',
            title: 'Best restaurants in San Francisco',
            description: 'Most often-seen on the web',
          },
          {
            image: 'https://via.placeholder.com/150',
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

      case 'Notes': {
        return (
          <div className="notes-content">
            <h3>Your Notes</h3>
            <textarea
              placeholder="Write your notes here..."
              rows="10"
              style={{ width: '100%', borderRadius: '5px', padding: '10px', border: '1px solid #ddd' }}
            />
          </div>
        );
      }

      case 'Places to Visit': {
        return (
        <div className="places-to-visit-container">
          {/* Search Bar with Google Places Autocomplete */}
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

          {/* Places to Visit List */}
          <div className="places-list">
            <h3>Your Places to Visit</h3>
            {placesToVisit.map((place) => (
              <div key={place.id} className="place-item">
                <p>{place.title}</p>
                <button className="delete-button" onClick={() => handleDeletePlace(place)}>
                  Delete
                </button>
              </div>
            ))}
          </div>

          {/* Suggested Locations */}
          <div className="suggested-locations">
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

      default:
        return <div>{selectedTab} content goes here...</div>;
    }
  };

  return (
    <div className="sidebar">
      {/* Sidebar Navigation */}
      <div className="sidebar-nav">
        <div
          className={`nav-item ${selectedTab === 'Explore' ? 'active' : ''}`}
          onClick={() => setSelectedTab('Explore')}
        >
          Explore
        </div>
        <div
          className={`nav-item ${selectedTab === 'Notes' ? 'active' : ''}`}
          onClick={() => setSelectedTab('Notes')}
        >
          Notes
        </div>
        <div
          className={`nav-item ${selectedTab === 'Places to Visit' ? 'active' : ''}`}
          onClick={() => setSelectedTab('Places to Visit')}
        >
          Places to Visit
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="sidebar-content">
        <div className="scrollable-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Sidebars;
