import React from 'react';
import TrackerMap from '../components/TrackerMap';
import LogLocationButton from '../components/LogLocationButton';
import LocationLogViewer from '../components/LocationLogViewer';

const DashboardPage = () => {
  return (
    <div className="dashboard-fill">
      <h2 style={{ marginBottom: '1.5rem' }}>Live Aid Box Tracker</h2>

      {/* 📍 Live map showing current GPS and aid delivery route */}
      <TrackerMap />

      {/* 🪪 Button and log viewer section */}
      <div style={{ marginTop: '2rem' }}>
        <LogLocationButton boxId={0} />
        <LocationLogViewer boxId={0} />
      </div>
    </div>
  );
};

export default DashboardPage;
