import React from 'react';
import TrackerMap from '../components/TrackerMap';
import LogLocationButton from '../components/LogLocationButton'; // Import logging button

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <h2>Live Aid Box Tracker</h2>

      {/* ✅ Live GPS map with aid box tracking */}
      <TrackerMap />

      {/* ✅ Button: Log current GPS location to blockchain */}
      <div style={{ marginTop: '20px' }}>
        <LogLocationButton boxId={0} />
      </div>
    </div>
  );
};

export default DashboardPage;
