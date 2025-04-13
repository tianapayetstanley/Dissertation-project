import React from 'react';
import boxLogo from '../../assets/images/box.png'; // Adjust if path is different
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={boxLogo} alt="Immutable Aid Logo" className="logo-img" />
        <span className="logo-text">Immutable Aid</span>
      </div>
      <ul className="sidebar-links">
        <li>🏠 Home</li>
        <li>📦 Track Boxes</li>
        <li>ℹ️ About Us</li>
      </ul>
    </div>
  );
};

export default Sidebar;
