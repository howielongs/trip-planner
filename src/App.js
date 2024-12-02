import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CoverPageView from './pages/CoverPageView';
import PlanTripPage from './components/PlanTripPage'; // Import PlanTripPage
import ItineraryPage from './components/ItineraryPage';
import ItineraryView from './pages/ItineraryView';
import Login from './components/Login';  // Import the Login component
import Itinerary from './components/Itinerary';

const App = () => {
  const [user, setUser] = useState(null);

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
          <Route path="/itinerary" element={<ItineraryPage user={user} />} />
          <Route path="/login" element={<Login onUserChange={setUser} />} />  {/* Add Login route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
