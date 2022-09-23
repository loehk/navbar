import { LocationObj } from './SelectedBarContainer';

export default function convertOpeningHours(
  hours: google.maps.places.PlaceResult['opening_hours'],
): LocationObj['opening_hours'] | void {}
