import React, { useState } from 'react';
import { ethers } from 'ethers';
import AidBoxTracker from '../contracts/AidBoxTracker.json'; // ABI
import useLiveLocation from '../hooks/useLiveLocation'; // Custom hook

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with current deployed address

const LogLocationButton = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const location = useLiveLocation();
  const coords = location?.coords || null;
  
  const handleLogLocation = async () => {
    if (!coords) {
      setMessage('📡 Location not available yet.');
      return;
    }

    try {
      setLoading(true);
      setMessage('⏳ Logging to blockchain...');

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, AidBoxTracker.abi, signer);

      const latlong = `${coords[0]},${coords[1]}`;
      const boxId = 0; // ake this dynamic later

      const tx = await contract.updateLocation(boxId, latlong);
      await tx.wait();

      setMessage('✅ Location logged on-chain!');
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to log location.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <button
        onClick={handleLogLocation}
        disabled={loading}
        style={{ padding: '10px 20px', background: '#eee' }}
      >
        Log GPS to Blockchain
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LogLocationButton;
