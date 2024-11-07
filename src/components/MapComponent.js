import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// Default center point (San Francisco)
const center = {
  lat: 37.7749,
  lng: -122.4194
};

function MapComponent() {
  // Load the Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState(null);

  // Callback function to initialize the map
  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  // Cleanup function when the map unmounts
  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}  // Set a zoom level that you want
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Sample Marker */}
      <Marker position={center} />

      {/* Add additional markers, info windows, etc., here */}
    </GoogleMap>
  ) : <div>Loading...</div>;
}

export default React.memo(MapComponent);
