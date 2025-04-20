import React from 'react';
import boxLogo from '../../assets/images/box.png'; 

const Header = () => {
  return (
    <div style={{ backgroundColor: 'blue', padding: '1rem', display: 'flex', alignItems: 'center' }}>
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
