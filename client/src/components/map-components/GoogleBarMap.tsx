import React, { useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { containerStyle, center, options } from './mapConfig';

export type MarkerType = {
  id: string;
  location: google.maps.LatLngLiteral;
  name: string;
  phone_number: string;
  website: string;
};

const GoogleBarMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_MAP_KEY
  });

  const mapRef = useRef<google.maps.Map<Element> | null>(null);

  const onLoad = (map: google.maps.Map<Element>): void => {
    mapRef.current = map;
  };

  const onUnMount = (): void => {
    mapRef.current = null;
  };


  if (!isLoaded) return <div>Map Loading ...</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={options as google.maps.MapOptions}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnMount}
>
      </GoogleMap>
    </div>
  );
};

export default GoogleBarMap;