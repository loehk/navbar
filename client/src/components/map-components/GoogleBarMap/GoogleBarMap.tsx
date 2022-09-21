import { useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { containerStyle, center, mapOptions } from './mapConfig';

export type MarkerType = {
  id: string;
  location: google.maps.LatLngLiteral;
  name: string;
  phone_number: string;
  website: string;
};

const GoogleBarMap = ({ darkmode }: { darkmode: boolean }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_MAP_KEY,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const onUnMount = () => {
    mapRef.current = null;
  };

  if (!isLoaded) return <div>Map Loading ...</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={mapOptions(darkmode)}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnMount}
      ></GoogleMap>
    </div>
  );
};

export default GoogleBarMap;
