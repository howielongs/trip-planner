import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CoverPageView from './pages/CoverPageView';
import PlanTripPage from './components/PlanTripPage'; // Import PlanTripPage
import ItineraryPage from './components/ItineraryPage';
import Login from './components/Login'; // Import the Login component

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/" className="nav-logo">Trip Planner</Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/itinerary" className="nav-link">Itinerary</Link>
            <Link to="/login" className="nav-link">Login</Link> {/* Add Login link */}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<CoverPageView />} />
          <Route path="/plan" element={<PlanTripPage />} /> {/* Add Plan Trip route */}
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
