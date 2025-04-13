import React from 'react';
import boxLogo from '../../assets/images/box.png'; // ✅ Update this path to match your folder

const Header = () => {
  return (
    <div style={{ backgroundColor: 'hotpink', padding: '1rem', display: 'flex', alignItems: 'center' }}>
      <img
        src={boxLogo}
        alt="Box Logo"
        style={{ height: '40px', marginRight: '10px' }}
      />
      <h1 style={{ color: 'white', margin: 0 }}>Immutable Aid Dashboard</h1>
    </div>
  );
};

export default Header;
