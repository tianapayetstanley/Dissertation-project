import React from 'react';

const OrgPage = ({ account }) => {
  return (
    <div>
      <h1>My Organization</h1>
      <p>Wallet address: {account}</p>
      {/* Show org deliveries and interactions here */}
    </div>
  );
};

export default OrgPage;
