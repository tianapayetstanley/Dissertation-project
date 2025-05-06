import React, { useEffect, useState } from 'react';
import { getContract } from '../utils/ethereum';

const LocationLogViewer = ({ boxId }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const contract = getContract();

        const filter = contract.filters.LocationLogged(boxId);
        const events = await contract.queryFilter(filter);

        const parsed = events.map(event => {
          const { lat, lon, timestamp } = event.args;
          return {
            lat,
            lon,
            time: new Date(timestamp * 1000).toLocaleString(),
          };
        });

        setLogs(parsed);
      } catch (err) {
        console.error('❌ Failed to fetch logs:', err);
      }
    };

    fetchLogs();
  }, [boxId]);

  return (
    <div style={{ marginTop: '1rem' }}>
      <h4>📜 Location Audit Log (Box #{boxId})</h4>
      {logs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <ul>
          {logs.map((log, i) => (
            <li key={i}>Lat: {log.lat}, Lon: {log.lon} at {log.time}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationLogViewer;
