import { Route, Routes, BrowserRouter } from 'react-router-dom';
import styles from './App.module.scss';
import Home from '../src/pages/home';
import GoogleBarMap from './components/map-components/GoogleBarMap/GoogleBarMap';
import LocationsPage from './pages/locations';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} caseSensitive={false} />
          <Route path="/home" element={<Home />} caseSensitive={false} />
          <Route path="/locations" element={<LocationsPage />} caseSensitive={false} />
          // 404 not found goes here
          <Route path="*" caseSensitive={false} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
