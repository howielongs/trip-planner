import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CoverPage from './pages/CoverPageView';
import ItineraryPage from './pages/ItineraryView';

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/" className="nav-logo">Trip Planner</Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <button className="nav-button">About</button>
            <button className="nav-button">GitHub</button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<CoverPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
