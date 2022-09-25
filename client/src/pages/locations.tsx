import GoogleBarMap from '../components/map-components/GoogleBarMap/GoogleBarMap';
import styles from './locations.module.scss';
import { useState, useEffect, useContext } from 'react';
import SideBar from '../components/map-components/SideBar/SideBar';
import TempDarkModeButton from '../components/map-components/TempDarkModeButton';
import { center } from '../components/map-components/GoogleBarMap/mapConfig';
import axios from 'axios';

  const placesRequest: google.maps.places.PlaceSearchRequest = {
    location: center,
    radius: 500,
    type: 'bar',
    rankBy: 0, // distance
  };

export default function LocationsPage() {
  // temp state for darkmode
  const [darkmode, setDarkmode] = useState(false);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [nearbyBars, setNearbyBars] = useState<google.maps.places.PlaceResult[] | null>(null);
  const [selectedBar, setSelectedBar] = useState<google.maps.places.PlaceResult | null>(null);
  const [selectedBarId, setSelectedBarId] = useState<string | null>(null);

  function toggleDarkMode() {
    setDarkmode(!darkmode);
  }

  function fetchNearbyBars(map: google.maps.Map) {
    console.log('fetching bars');
    new google.maps.places.PlacesService(map).nearbySearch(placesRequest, res => {
      console.log(res);
      if (res) setNearbyBars(res);
    });
  }

  useEffect(() => {
    if (map) fetchNearbyBars(map);
  }, [map]);

  useEffect(()=>{
    if(map){
      if(selectedBar)
      map!.panTo(selectedBar!.geometry?.location!)
    }

  },[selectedBar])



  // if (!map) return <div>Loading...</div>;

  return (
    <div className={styles.LocationsPage}>
      <SideBar
        map={map!}
        nearbyBars={nearbyBars}
        setSelectedBar={setSelectedBar}
        selectedBarId={selectedBarId}
        setSelectedBarId={setSelectedBarId}
      />
      <GoogleBarMap
        darkmode={darkmode}
        map={map}
        setMap={setMap}
        nearbyBars={nearbyBars}
        // selectedBar={selectedBar}
        // setSelectedBar={setSelectedBar}
        selectedBarId={selectedBarId}
        setSelectedBarId={setSelectedBarId}
      />
      <TempDarkModeButton toggleDarkMode={toggleDarkMode} />
    </div>
  );
}
