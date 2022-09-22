import styles from './Search.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { StandaloneSearchBox, GoogleMap, Autocomplete } from '@react-google-maps/api';
import { useState, useRef, useEffect } from 'react';

type Props = {};

function Search({}: Props) {
  const inputRef = useRef<any>(null);

  const [searchBox, setSearchBox] = useState<any>(null);

  // in case of location service issues, the default value is the center of Riga
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 56.95,
    longitude: 24.1,
  });

  // fetches current location when the component loads
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
    };

    const error = (error: GeolocationPositionError) => {
      console.error('Failed to fetch location! Please enable location services in your browser.');
    };
    const success = (location: GeolocationPosition) => {
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  const onPlacesChanged = () => {
    console.log(searchBox!.getPlaces());
  };

  const onLoadHandler = (ref: any) => {
    setSearchBox(ref);
  };

  const changeHandler = () => {
    console.log(inputRef?.current?.value);
  };

  const coordinates = new google.maps.LatLng(currentLocation.latitude, currentLocation.longitude);

  const swOrLatLngBounds = google.maps.geometry.spherical.computeOffset(
    coordinates.toJSON(),
    500,
    240,
  );
  const ne = google.maps.geometry.spherical.computeOffset(coordinates.toJSON(), 500, 60);
  const mapBounds = new google.maps.LatLngBounds(swOrLatLngBounds.toJSON(), ne.toJSON());
  const options = {
    types: ["bar"],
  }


  return (
    <motion.div
      initial={{ y: 100, opacity: 0.2 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={styles.searchContainer}
    >
      <SearchIcon sx={{ fontSize: 30, color: '#7d6b91', margin: 1.5 }} />
      <GoogleMap>
        <Autocomplete options={options} bounds={mapBounds} onPlaceChanged={onPlacesChanged} onLoad={onLoadHandler}>
          <TextField
            onChange={changeHandler}
            inputRef={inputRef}
            sx={{
              width: '100%',
              '& .MuiInput-underline:before': { borderBottomColor: 'rgb(204, 202, 202)' },
              '& .MuiInput-underline:after': { borderBottomColor: '#7d6b91' },
            }}
            variant="standard"
            placeholder="Search"
          />
        </Autocomplete>
      </GoogleMap>
      <Button
        sx={{ marginLeft: 3, textTransform: 'none', fontSize: 15, width: '30%', padding: 1.6 }}
        size="large"
        variant="contained"
      >
        Search
      </Button>
    </motion.div>
  );
}

export default Search;
