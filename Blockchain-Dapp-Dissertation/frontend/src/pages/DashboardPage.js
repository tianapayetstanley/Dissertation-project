import React from 'react';
import TrackerMap from '../components/TrackerMap';
import LogLocationButton from '../components/LogLocationButton';
import LocationLogViewer from '../components/LocationLogViewer';


const DashboardPage = () => {
  return (
    <div className="dashboard-container" style={{ minHeight: '100vh', padding: '1rem' }}>
      <h2>Live Aid Box Tracker</h2>

      {/* ✅ Live GPS map with aid box tracking */}
      <TrackerMap />

      {/* ✅ Button: Log current GPS location to blockchain */}
      <div style={{ marginTop: '20px' }}>
        <LogLocationButton boxId={0} />
        <LocationLogViewer boxId={0} />
      </div>
    </div>
  );
};

export default DashboardPage;
