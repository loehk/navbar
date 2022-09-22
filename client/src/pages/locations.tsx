import GoogleBarMap from '../components/map-components/GoogleBarMap/GoogleBarMap';
import styles from './locations.module.scss';
import { useRef, useState, useEffect } from 'react';
import SideBar from '../components/map-components/SideBar/SideBar';
import TempDarkModeButton from '../components/map-components/TempDarkModeButton';
import { center } from '../components/map-components/GoogleBarMap/mapConfig';

const placesRequest: google.maps.places.PlaceSearchRequest = {
  location: center,
  radius: 500,
  type: 'bar',
};

export default function LocationsPage() {
  // temp state for darkmode
  const [darkmode, setDarkmode] = useState(false);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [nearbyBars, setNearbyBars] = useState<google.maps.places.PlaceResult[] | null>(null);
  const [selectedBar, setSelectedBar] = useState<google.maps.places.PlaceResult | null>(null);

  function toggleDarkMode() {
    setDarkmode(!darkmode);
  }

  function fetchNearbyBars(map: google.maps.Map) {
    console.log('fetching bars');
    new google.maps.places.PlacesService(map).nearbySearch(placesRequest, res => {
      console.log(res);
      if (res) setNearbyBars(res.filter(bar => bar));
    });
  }

  useEffect(() => {
    if (map) fetchNearbyBars(map);
  }, [map]);

  return (
    <div className={styles.LocationsPage}>
      <SideBar nearbyBars={nearbyBars} />
      <GoogleBarMap
        darkmode={darkmode}
        map={map}
        setMap={setMap}
        nearbyBars={nearbyBars}
        selectedBar={selectedBar}
        setSelectedBar={setSelectedBar}
      />
      <TempDarkModeButton toggleDarkMode={toggleDarkMode} />
    </div>
  );
}
