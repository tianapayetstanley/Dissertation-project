import React from 'react';
import './Sidebar.css';
import boxLogo from '../../assets/images/box.png';
import { FaHome, FaBoxOpen, FaUser } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo + Title */}
      <div className="sidebar-header">
        <img src={boxLogo} alt="Logo" className="sidebar-logo" />
        <span className="sidebar-title">Immutable Aid</span>
      </div>

      {/* Nav Links */}
      <nav className="sidebar-nav">
        <div className="sidebar-item">
          <FaHome className="sidebar-icon" />
          <span>Dashboard</span>
        </div>
        <div className="sidebar-item">
          <FaBoxOpen className="sidebar-icon" />
          <span>Deliveries</span>
        </div>
        <div className="sidebar-item">
          <FaUser className="sidebar-icon" />
          <span>Profile</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
