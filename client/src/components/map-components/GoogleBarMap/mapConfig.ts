import mapStyleDark from './mapStyles/mapStyleDark';
import mapStyleDefault from './mapStyles/mapStyleDefault';
import mapStyleLight from './mapStyles/mapStyleLight';
import { CSSProperties } from 'react';

export const containerStyle: CSSProperties = {
  width: '100%',
  height: '100%',
};

// Disable default UI
export const mapOptions = (darkmode: boolean): google.maps.MapOptions => ({
  styles: [...(darkmode ? mapStyleDark : mapStyleLight), ...mapStyleDefault],
  disableDefaultUI: true,
  zoomControl: true,
});
