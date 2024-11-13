import React from 'react';
import '../styles/Sidebars.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Overview</h3>
      <nav>
        <ul>
          <li>Explore</li>
          <li>Notes</li>
          <li>Places to Visit</li>
          <li>Untitled</li>
        </ul>
      </nav>
      <h3>Itinerary</h3>
      <p>Add trip dates</p>
      <h3>Budget</h3>
      <p>View</p>
    </div>
  );
};

export default Sidebar;
