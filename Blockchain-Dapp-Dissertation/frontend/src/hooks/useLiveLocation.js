// Custom React Hook to get live GPS position
import { useState, useEffect } from 'react';

const useLiveLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          timestamp: pos.timestamp,
        });
      },
      (err) => {
        console.error("❌ GPS error:", err);
        alert("Failed to get location");
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return location;
};

export default useLiveLocation;
