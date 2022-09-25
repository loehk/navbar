import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import styles from './App.module.scss';
import Home from '../src/pages/home';
import { LoadScriptProps, useJsApiLoader } from '@react-google-maps/api';
import { LocationContextProvider } from './store/location-context';
import { UserContextProvider } from './components/landing-components/authentication/UserContext';
import LocationsPage from './pages/locations';
import UserSettings from './components/account-components/UserSettings';
import About from "./components/landing-components/BottomSection/About/About"

const libraries: LoadScriptProps['libraries'] = ['places', 'geometry'];

function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_MAP_KEY,
    libraries: libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className={styles.App}>
      <LocationContextProvider>
        <UserContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} caseSensitive={false} />
              <Route path="/home" element={<Home />} caseSensitive={false} />
              <Route path="/locations" element={<LocationsPage />} caseSensitive={false} />
              <Route path="/settings" element={<UserSettings />} caseSensitive={false} />
              <Route path="#about" element={<About />} caseSensitive={false} />
              // 404 not found goes here
              <Route path="*" caseSensitive={false} />
            </Routes>
          </BrowserRouter>
        </UserContextProvider>
      </LocationContextProvider>
    </div>
  );
}
export default App;
