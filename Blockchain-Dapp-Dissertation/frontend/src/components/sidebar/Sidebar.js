import React from 'react';
import './Sidebar.css';
import boxLogo from '../../assets/images/box.png';
import { FaHome, FaBoxOpen, FaUser, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo + Title */}
      <div className="sidebar-header">
        <img src={boxLogo} alt="Logo" className="sidebar-logo" />
        <span className="sidebar-title">Immutable Aid</span>
      </div>

      {/* Nav Links with routing */}
      <nav className="sidebar-nav">
        <Link to="/" className="sidebar-item">
          <FaHome className="sidebar-icon" />
          <span>Dashboard</span>
        </Link>
        <Link to="/deliveries" className="sidebar-item">
          <FaBoxOpen className="sidebar-icon" />
          <span>Deliveries</span>
        </Link>
        <Link to="/organizations" className="sidebar-item">
          <FaUser className="sidebar-icon" />
          <span>Organizations</span>
        </Link>
        <Link to="/about" className="sidebar-item">
          <FaInfoCircle className="sidebar-icon" />
          <span>About</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
