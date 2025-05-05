import React, { useState } from 'react';
import { ethers } from 'ethers';
import useLiveLocation from './useLiveLocation';
import AidBoxTracker from '../contracts/AidBoxTracker.json';

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with actual deployed address

const LogLocationButton = ({ boxId = 0 }) => {
  const { coords, error } = useLiveLocation();
  const [loading, setLoading] = useState(false);

  const handleLogLocation = async () => {
    if (!coords) return alert("Live GPS not available");

    try {
      setLoading(true);
      const [lat, lon] = coords;
      const raw = `${lat},${lon}`;
      const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(raw));

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, AidBoxTracker.abi, signer);

      const tx = await contract.logLocation(boxId, hash);
      await tx.wait();

      alert("✅ Location hash logged to blockchain");
    } catch (err) {
      console.error("❌ Failed to log location:", err);
      alert("Failed to log location");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLogLocation} disabled={!coords || loading}>
      {loading ? 'Logging...' : 'Log GPS to Blockchain'}
    </button>
  );
};

export default LogLocationButton;
