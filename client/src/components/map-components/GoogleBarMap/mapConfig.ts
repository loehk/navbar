import mapStyleDark from './mapStyles/mapStyleDark';
import mapStyleDefault from './mapStyles/mapStyleDefault';
import mapStyleLight from './mapStyles/mapStyleLight';
import { CSSProperties } from 'react';

export const containerStyle: CSSProperties = {
  width: '100%',
  height: '100vh',
};

// Center on Riga
export const center: google.maps.LatLngLiteral = {
  lat: 56.95,
  lng: 24.1,
};

// Disable default UI
export const mapOptions = (darkmode: boolean): google.maps.MapOptions => ({
  styles: [...(darkmode ? mapStyleDark : mapStyleLight), ...mapStyleDefault],
  disableDefaultUI: true,
  zoomControl: true,
});
