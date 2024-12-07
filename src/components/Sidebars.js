import React, { useState, useEffect, useRef } from 'react';
import '../styles/Sidebars.css';
import fisherman from '../assets/fisher.png';
import bridge from '../assets/bridge.png';
import prison from '../assets/alcatraz.png';
import location1 from '../assets/location1.png';
import location2 from '../assets/location2.png';
import location3 from '../assets/location3.png';


//TODOS: 
//redo the format of saved trips to match itinerary db
// finish additinerary
//figure out how to dynamically add userID
//add long and lat coordinates to the db
// add itinerary start date from planning button 

const Sidebars = ({ onAddMapMarker, user, itinerary }) => {
  const [selectedTab, setSelectedTab] = useState('Explore');
  const [placesToVisit, setPlacesToVisit] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [tripName, setTripName] = useState('');
  const [savedTrips, setSavedTrips] = useState([]);
  const [notes, setNotes] = useState('');
  const [prevActivitescount, setPrevActivitiescount] = useState(0);
  const [activitescount, setActivitiescount] = useState(0);
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [itineraryCount, setIntineraryCount] = useState(0);
  const [itinerary_id, setIntinerary_id] = useState(null);
  //grab suggestions
  useEffect(() => {
    fetch("http://localhost:3000/suggestions")
      .then((response) => response.json())
      .then((data) => {

  
        const transformedLocations = data.map((item) => ({
          id: item.suggestion_id,
          image: item.imageurl,
          title: item.location_name,
          description: item.description,
          location: { lat: item.latitude, lng:  item.longitude}, 
        }));
  
        setSuggestedLocations(transformedLocations);
      })
      .catch((error) => console.error("Error fetching suggestions:", error));
  }, []);

  //grab saved trips
  useEffect(() => {  
    if(user){
      fetch(`http://localhost:3000/${user.user_id}/itineraries`, { // Dynamically insert user.user_id into the URL
        method: 'GET', // Use GET as per your backend route
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch itineraries');
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            setIntineraryCount(data.length);
            setSavedTrips(data); // Update the state with the fetched itineraries
            console.log(data); // Debugging: log the fetched data
          } else {
            console.error('API response is not an array:', data);
          }
        })
        .catch((error) => console.error('Error fetching itineraries:', error));}
  }, []); 
  
  //grab previous places to visit
  useEffect(() => {
  if(user && itinerary_id){
  fetch(`http://localhost:3000/${user.user_id}/${itinerary_id}/activities`, { // Dynamically insert user.user_id and itinerary_id into the URL
    method: 'GET', // Use GET as per your backend route
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }
      return response.json();
    })
    .then((data) => {
      setPlacesToVisit([]);
      const uniquePlaces = new Set(); // Use a Set to track unique IDs
      if (Array.isArray(data)) {
        setPrevActivitiescount(data.length);
        data.forEach( (prevlocation) => {
          const prevplace = {
            id: prevlocation.activity_id, 
            name: prevlocation.activity_name,
            title: prevlocation.address, 
            image: '',
            description: '',
            location: {lat: prevlocation.lat, lng: prevlocation.lon},
          };
          setPlacesToVisit((prev) => [...prev, prevplace]);  
          setActivitiescount((prevCount) => prevCount + 1);
        })
      } else {
        console.error('API response is not an array:', data);
      }
    })
    .catch((error) => console.error('Error fetching activities:', error));
  }
  }, []); 
  

  const autocompleteRef = useRef(null);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    console.log(place);
    if (place && place.geometry && place.geometry.location) {
      const { lat, lng } = place.geometry.location;
      const newPlace = {
        id: Date.now(),
        name: place.name || place.formatted_address, // Use name if available, fallback to formatted_address
        title: place.formatted_address,
        image: '',
        description: '',
        location: { lat: lat(), lng: lng() },
      };
      onAddMapMarker({ lat: lat(), lng: lng() });
      console.log("Place added via handlePlaceSelect:", newPlace);
    } else {
      console.error('Place does not have geometry or location data');
    }
  };
  
  const handleSearchAdd = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const { lat, lng } = place.geometry.location;
        const newPlace = {
          id: Date.now(),
          name: place.name || place.formatted_address,
          title: place.formatted_address,
          image: '',
          description: '',
          location: { lat: lat(), lng: lng() },
        };
        setPlacesToVisit((prev) => [...prev, newPlace]);
        console.log("Place added via handleSearchAdd:", newPlace);
        setActivitiescount((prevCount) => prevCount + 1);
        setSearchInput(''); // Clear search input after adding the place
      } else {
        console.error('Autocomplete did not return a valid place');
      }
    } else if (searchInput.trim()) {
      // Fallback to input text if autocomplete did not trigger or complete
      const newPlace = {
        id: Date.now(),
        name: searchInput,
        title: searchInput,
        image: '',
        description: '',
        location: { lat: 2340.0, lng: 395.9 }, // Default coordinates for non-autocomplete input
      };
      setPlacesToVisit((prev) => [...prev, newPlace]);
      console.log("Place added via fallback in handleSearchAdd:", newPlace);
      setActivitiescount((prevCount) => prevCount + 1);
      setSearchInput(''); // Clear search input after adding the place
    } else {
      console.error('Search input is empty or invalid');
    }
  };
  

  const deleteActivites = () => {
    while(prevActivitescount != 0){
      fetch(`http://localhost:3000/${user.user_id}/${itinerary.itinerary_id}/activity/${prevActivitescount}`, { // Dynamically insert user.user_id and itinerary.itinerary_id into the URL
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch activities');
        }
        return response.json();
      })
      .then((data) => {
        setPrevActivitiescount(prevActivitescount -1);
      })
      .catch((error) => console.error('Error fetching itineraries:', error));
    }
  };

  const updateActivities  = ()  => {
    placesToVisit.forEach((place, index) => {
      fetch(`http://localhost:3000/${user.user_id}/${itinerary_id}/activity/${index+1}`, { // Dynamically insert user.user_id and itinerary_id into the URL
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lon: place.location.lng,
          lat: place.location.lat,
          activity_name: place.name,
          start_date: Date.now, //add in itinerary date
          address: place.title,
          activity_id: index+1,
      }),})
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add activity');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
            })
      .catch((error) => console.error('Error updating activities:', error));
    })
  };
 
  const addItinerary = (trip) => {
    fetch(`http://localhost:3000/itinerary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: trip.user_id,
        itinerary_name: trip.itinerary_name,
        start_date: trip.start_date, // Get the start date from the plan page
        end_date: trip.end_date,
        created_date: trip.created_date, // Default to current date if not provided
        activity_count: trip.activity_count,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add itinerary');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Itinerary added successfully:', data);
      })
      .catch((error) => console.error('Error adding itinerary:', error));
  };

  const handleSaveTrip = () => {
    if (tripName.trim() && placesToVisit.length > 0) {
    if(!user){
      alert("you must sign in to save your itinerary")
    }

    else if(itinerary_id){
      deleteActivites();
      updateActivities();
    }
    else{
        const newTrip = {
        user_id: user.user_id,
        itinerary_name: tripName,
        start_date: '12-11-2024', //got to get the startdate from the plan page
        end_date: '00-00-0000',
        created_date:  '00-00-0000',
        activity_count: activitescount,
      };
      addItinerary(newTrip);
      updateActivities();
      setSavedTrips((prev) => [...prev, newTrip]);
      setTripName('');
      setPlacesToVisit([]);
      alert('Trip saved successfully!');
    }
    } else {
      alert('Please enter a trip name and add at least one place.');
    }
  };

  const handleAddPlace = (place) => {
    console.log(place);
    setPlacesToVisit((prev) => [...prev, place]);
    setSuggestedLocations((prev) => prev.filter((item) => item.id !== place.id));
    setActivitiescount((prevCount) => prevCount + 1);
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
            link: 'https://www.sftravel.com/article/top-20-attractions-san-francisco',
          },
          {
            image: location2,
            title: 'Best restaurants in San Francisco',
            description: 'Most often-seen on the web',
            link: 'https://www.theinfatuation.com/san-francisco/guides/best-restaurants-in-san-francisco',
          },
          {
            image: location3,
            title: 'Search hotels with transparent pricing',
            description: "Unlike most sites, we don’t sort based on commissions",
            link: 'https://www.cntraveler.com/gallery/best-hotels-in-san-francisco',
          },
        ];
  
        return (
          <div className="explore-grid">
            {exploreItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="explore-card"
              >
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </a>
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
          {savedTrips.length > 0 ? (
            savedTrips.map((olditinerary) => (
              <div key={olditinerary.itinerary_id} className="itinerary-item">
                <h4>{olditinerary.itinerary_name}</h4>
                <p>Start Date: {olditinerary.start_date}</p>
              </div>
            ))
          ) : user ? (
            <p>No Previous Itineraries</p>
          ) : (
            <p>Please Login to See Previous Itineraries</p>
          )}
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
