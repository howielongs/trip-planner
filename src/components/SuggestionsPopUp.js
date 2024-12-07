import React, { useState, useEffect } from "react";
import "../styles/SuggestionsPopUp.css";

function SuggestionsPopup({ onClose, onSuggestionSelect }) {
    const [suggestions, setSuggestions] = useState({});
    const [selectedSuggestion, setSelectedSuggestion] = useState("");

    // Fetch data from API and group by tags
    useEffect(() => {
        fetch("http://localhost:3000/suggestions")
            .then((response) => response.json())
            .then((data) => {
                const grouped = data.reduce((acc, suggestion) => {
                    const tag = suggestion.tags;
                    if (!acc[tag]) acc[tag] = [];
                    acc[tag].push(suggestion);
                    return acc;
                }, {});
                setSuggestions(grouped);
            })
            .catch((error) => console.error("Error fetching suggestions:", error));
    }, []);

    // Handle selection from the dropdown
    const handleSelect = (event) => {
        setSelectedSuggestion(event.target.value);
    };

    // Handle "Done" button click
    const handleDone = () => {
        if (selectedSuggestion) {
            onSuggestionSelect(selectedSuggestion); // Pass selected suggestion back to parent
        }
        onClose(); // Close the popup
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Suggestions</h2>
                <select value={selectedSuggestion} onChange={handleSelect}>
                    <option value="" disabled>
                        Select a suggestion
                    </option>
                    {Object.keys(suggestions).map((tag) => (
                        <optgroup key={tag} label={tag}>
                            {suggestions[tag].map((suggestion) => (
                                <option
                                    key={suggestion.suggestion_id}
                                    value={suggestion.location_name}
                                >
                                    {suggestion.location_name} - {suggestion.address}
                                </option>
                            ))}
                        </optgroup>
                    ))}
                </select>
                <button onClick={handleDone} className="done-btn">
                    Done
                </button>
            </div>
        </div>
    );
}

export default SuggestionsPopup;
