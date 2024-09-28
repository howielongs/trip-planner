import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',  // Ensure it takes up the full width
  height: '100%'  // Ensure it takes up the full height
};

const center = {
  lat: 37.7749,  // Change this to a default latitude, e.g., San Francisco
  lng: -122.4194 // Change this to a default longitude
};

function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_API_KEY"  // Add your Google Maps API Key here
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* You can add markers, info windows, etc., here */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MapComponent)
