import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { orgLocations } from '../data/orgLocations';
import { aidDeliveries } from '../data/mockOrgs';
import useLiveLocation from './useLiveLocation'; //  Custom hook to get mobile location

// Fix Leaflet marker icon paths
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
  const livePosition = useLiveLocation(); // Live GPS from phone

  // Just track first delivery statically for now
  const delivery = aidDeliveries[0];
  const origin = orgLocations[delivery.originOrg];
  const destination = orgLocations[delivery.destinationOrg];

  return (
    <MapContainer center={origin} zoom={3} style={{ height: '500px', width: '100%' }}>
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

      {/* 🚶 Live position marker (mobile) */}
      {livePosition && (
        <Marker position={livePosition}>
          <Popup>📡 Current Location (You)</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default TrackerMap;
