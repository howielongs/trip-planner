import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

// Default center point
const center = {
  lat: 37.7749,
  lng: -122.4194,
};

function MapComponent({ markers }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'], // Include 'places' library
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && markers.length) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach((marker) => bounds.extend(marker));
      map.fitBounds(bounds);
    }
  }, [map, markers]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markers.map((marker, index) => (
        <Marker key={index} position={marker} />
      ))}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
}

export default React.memo(MapComponent);
