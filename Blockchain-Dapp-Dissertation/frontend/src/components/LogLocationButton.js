import React, { useState } from 'react';
import useLiveLocation from '../hooks/useLiveLocation';
import { getContract } from '../utils/ethereum';

const LogLocationButton = ({ boxId = 0 }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLiveLocation();

  const handleClick = async () => {
    if (!location) {
      setMessage('📍 Location not available yet');
      return;
    }

    const coords = `${location.lat},${location.lng}`;

    try {
      const contract = getContract();
      if (!contract.updateLocation) {
        setMessage('❌ updateLocation not available on contract');
        console.error("updateLocation not found on contract instance");
        return;
      }

      setLoading(true);
      const tx = await contract.updateLocation(boxId, coords);
      await tx.wait();
      setMessage('✅ Location logged to blockchain');
    } catch (err) {
      console.error('❌ Logging failed', err);
      setMessage('❌ Failed to log location');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={handleClick} disabled={loading}>
        Log Current Location 📍
      </button>
      <p style={{ color: message.startsWith('❌') ? 'red' : 'green' }}>{message}</p>
    </div>
  );
};

export default LogLocationButton;
