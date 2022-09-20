import mapStyles from './mapStyles';

export const containerStyle = {
  width: '100%',
  height: '100vh'
};

// Center on Riga
export const center = {
  lat: 56.95,
  lng: 24.10
};

// Disable default UI
export const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
};