import GoogleBarMap from '../components/map-components/GoogleBarMap/GoogleBarMap';
import styles from './locations.module.scss';
import { useState } from 'react';
import SideBar from '../components/map-components/SideBar/SideBar';
import TempDarkModeButton from '../components/map-components/TempDarkModeButton';

export default function LocationsPage() {
  // temp state for darkmode
  const [darkmode, setDarkmode] = useState(true);

  const toggleDarkMode = () => setDarkmode(!darkmode);

  return (
    <div className={styles.LocationsPage}>
      <GoogleBarMap darkmode={darkmode} />
      <SideBar />
      <TempDarkModeButton toggleDarkMode={toggleDarkMode} />
    </div>
  );
}
