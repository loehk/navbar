import React, { useRef, useState, useContext } from 'react';
import { GoogleMap, Marker, useJsApiLoader, LoadScriptProps } from '@react-google-maps/api';
import { containerStyle, options } from './mapConfig';
import { LocationContext } from '../../store/location-context';

export type MarkerType = {
  id: string;
  location: google.maps.LatLngLiteral;
  name: string;
  phone_number: string;
  website: string;
};

const GoogleBarMap = () => {
  const locationContext = useContext(LocationContext);

  const mapRef = useRef<google.maps.Map<Element> | null>(null);

  const onLoad = (map: google.maps.Map<Element>): void => {
    mapRef.current = map;
  };

  const onUnMount = (): void => {
    mapRef.current = null;
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={options as google.maps.MapOptions}
        center={{
          lat: locationContext!.currentLocation.lat,
          lng: locationContext!.currentLocation.lng,
        }}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnMount}
      ></GoogleMap>
    </div>
  );
};

export default GoogleBarMap;
