import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CoverPageView from './pages/CoverPageView';
import ItineraryView from './pages/ItineraryView';
import Login from './components/Login';  // Import the Login component

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/" className="nav-logo">Trip Planner</Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/login" className="nav-link">Login</Link>  {/* Add Login link */}
            <Link to="/itinerary" className="nav-link">Itinerary</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<CoverPageView />} />
          <Route path="/itinerary" element={<ItineraryView />} />
          <Route path="/login" element={<Login />} />  {/* Add Login route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
