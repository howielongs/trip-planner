import React, { useState } from "react";
import "../styles/ItineraryPage.css";
import SuggestionsPopup from "./SuggestionsPopUp.js";

const Itinerary = ({ user }) => {
    const [activities, setActivities] = useState([
        { id: 1, name: "Brunch at 4 Seasons", time: "10:00 AM - 11:30 AM", transport: "Uber (11:45 AM)", completed: true },
        { id: 2, name: "Hike at Mt. Linen", time: "Noon - 2:30 PM", transport: "Train (3:00 PM)", completed: true },
        { id: 3, name: "Shopping & Eating at Valley Fair Mall", time: "3:30 - 5:30 PM", completed: false },
    ]);

    const [selectedActivityId, setSelectedActivityId] = useState(null); // Track the selected activity
    const [showPopup, setShowPopup] = useState(false); // Control popup visibility
    const [showLoginPopup, setShowLoginPopup] = useState(false); // Popup for login notification

    // Open popup for a specific activity
    const openPopup = (activityId) => {
        setSelectedActivityId(activityId);
        setShowPopup(true);
    };

    // Handle suggestion selection
    const handleSuggestionSelect = (selectedSuggestion) => {
        setActivities((prevActivities) =>
            prevActivities.map((activity) =>
                activity.id === selectedActivityId
                    ? { ...activity, name: selectedSuggestion }
                    : activity
            )
        );
    };

    // Handle Save button click
    const handleSave = () => {
        if (user) {
            console.log("Itinerary saved:", activities);
            
            alert("Itinerary saved successfully!");
        } else {
            setShowLoginPopup(true); // Show login notification popup
        }
    };

    return (
        <div className="itinerary-container">
            <header className="header">
                <h1>Itinerary</h1>
                <button className="save-button" onClick={handleSave}>
                    Save
                </button>
            </header>

            <div className="map-section">
                <div className="map-placeholder">Map Placeholder</div>
            </div>

            <div className="summary-section">
                <div className="time-section">
                    <label>Time:</label>
                    <span>1:00 AM to 6:00 PM</span>
                </div>
                <div className="activities-section">
                    <label>Activities:</label>
                    <span>{activities.length}</span>
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
                            <button
                                onClick={() => openPopup(activity.id)}
                                className="select-button"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <footer className="footer">
                <span>About</span>
                <span>FAQ</span>
                <span>Support</span>
            </footer>

            {showPopup && (
                <SuggestionsPopup
                    onClose={() => setShowPopup(false)}
                    onSuggestionSelect={handleSuggestionSelect}
                />
            )}

            {showLoginPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Sign In Required</h2>
                        <p>You need to sign in to save your itinerary.</p>
                        <button onClick={() => setShowLoginPopup(false)} className="close-popup-button">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Itinerary;
