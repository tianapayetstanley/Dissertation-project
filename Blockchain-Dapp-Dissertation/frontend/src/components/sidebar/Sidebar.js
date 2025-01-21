import React from 'react';
import './Sidebar.css';

const Sidebar = () => (
  <div className="sidebar">
    <div className="logo">
      <img src="/assets/logo.svg" alt="Immutable Aid Logo" />
    </div>
    <nav>
      <ul>
        <li>
          <img src="/assets/home-icon.svg" alt="Home" /> Home
        </li>
        <li>
          <img src="/assets/track-icon.svg" alt="Track Aid Boxes" /> Track Boxes
        </li>
        <li>
          <img src="/assets/about-icon.svg" alt="About Us" /> About Us
        </li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;
