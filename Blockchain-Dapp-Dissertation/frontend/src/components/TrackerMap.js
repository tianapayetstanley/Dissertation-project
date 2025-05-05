import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { aidDeliveries } from './data/mockData';
import { orgs as orgLocations } from './data/mockOrgs';

import useLiveLocation from '../hooks/useLiveLocation'; // 📍 Custom hook for mobile GPS

// 🛠️ Fix Leaflet marker icon path issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const TrackerMap = () => {
  const livePosition = useLiveLocation(); // 📡 Mobile live GPS

  const delivery = aidDeliveries[0];
  const origin = orgLocations[delivery.originOrg] || [51.5, -0.09]; // Fallback: London
  const destination = orgLocations[delivery.destinationOrg] || [40.7, -74.0]; // Fallback: New York

  return (
    <MapContainer
      center={livePosition ? [livePosition.lat, livePosition.lng] : origin} // 🧭 Prefer live location
      zoom={3}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 🏢 Origin marker */}
      <Marker position={origin}>
        <Popup>📦 Sent From: {delivery.originOrg}</Popup>
      </Marker>

      {/* 🎯 Destination marker */}
      <Marker position={destination}>
        <Popup>🎯 Destination: {delivery.destinationOrg}</Popup>
      </Marker>

      {/* 🚶 Live position marker (you) */}
      {livePosition && (
        <Marker position={[livePosition.lat, livePosition.lng]}>
          <Popup>📡 Current Location (You)</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default TrackerMap;
