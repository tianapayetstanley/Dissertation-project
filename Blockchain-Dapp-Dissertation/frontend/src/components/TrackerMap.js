import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { aidDeliveries } from './data/mockData';
import { orgs as orgLocations } from './data/mockOrgs';
import useLiveLocation from '../hooks/useLiveLocation';

// Fix Leaflet marker icon path issue for default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const boxEmojiIcon = L.divIcon({
  html: '📦',
  className: 'emoji-icon',
  iconSize: [32, 32],
});

// Emoji-based divIcons
const originIcon = L.divIcon({
  html: '📤',
  className: 'emoji-icon',
  iconSize: [32, 32],
});

const destinationIcon = L.divIcon({
  html: '🎯',
  className: 'emoji-icon',
  iconSize: [32, 32],
});

const liveIcon = L.divIcon({
  html: '🚶',
  className: 'emoji-icon',
  iconSize: [32, 32],
});


const TrackerMap = () => {
  const livePosition = useLiveLocation();

  const delivery = aidDeliveries[0];
  const origin = orgLocations[delivery.originOrg] || [51.5, -0.09];
  const destination = orgLocations[delivery.destinationOrg] || [40.7, -74.0];

  return (
    <MapContainer
      center={livePosition ? [livePosition.lat, livePosition.lng] : origin}
      zoom={3}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
  
      {/* 📤 Origin marker */}
      <Marker position={origin} icon={L.divIcon({ html: '📤', className: 'emoji-icon', iconSize: [32, 32] })}>
        <Popup>📤 Sent From: {delivery.originOrg}</Popup>
      </Marker>
  
      {/* 🎯 Destination marker */}
      <Marker position={destination} icon={L.divIcon({ html: '🎯', className: 'emoji-icon', iconSize: [32, 32] })}>
        <Popup>🎯 Destination: {delivery.destinationOrg}</Popup>
      </Marker>
  
      {/* 🚚 Live delivery truck position */}
      {livePosition && (
        <Marker
          position={[livePosition.lat, livePosition.lng]}
          icon={L.divIcon({ html: '🚚', className: 'emoji-icon', iconSize: [32, 32] })}
        >
          <Popup>🚚 In Transit (Live)</Popup>
        </Marker>
      )}
    </MapContainer>
  );
  
};

export default TrackerMap;
