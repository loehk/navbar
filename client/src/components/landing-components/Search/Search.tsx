import styles from './Search.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { GoogleMap, Autocomplete } from '@react-google-maps/api';
import { useState, useRef, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LocationContext } from '../../../store/location-context';
import React from 'react';

type Props = {};

function Search({}: Props) {
  const inputRef = useRef<any>(null);

  const [searchBox, setSearchBox] = useState<any>(null);

  const locationContext = useContext(LocationContext);

  // fetches current location when the component loads
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
    };

    const error = (error: GeolocationPositionError) => {
      console.error('Failed to fetch location! Please enable location services in your browser.');
    };
    const success = (location: GeolocationPosition) => {
      locationContext!.setCurrentLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
    return () => {};
  }, [searchBox]);

  const onPlaceChanged = () => {
    locationContext?.setCurrentLocation({
      lat: searchBox.getPlace().geometry.location.lat(),
      lng: searchBox.getPlace().geometry.location.lng(),
    });
  };

  const onLoadHandler = (ref: any) => {
    setSearchBox(ref);
  };

  const coordinates = new google.maps.LatLng(
    locationContext!.currentLocation.lat,
    locationContext!.currentLocation.lng,
  ).toJSON();

  const swOrLatLngBounds = google.maps.geometry.spherical.computeOffset(coordinates, 500, 240);
  const ne = google.maps.geometry.spherical.computeOffset(coordinates, 500, 60);
  const mapBounds = new google.maps.LatLngBounds(swOrLatLngBounds.toJSON(), ne.toJSON());

  const options = {
    types: ['bar'],
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0.2 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={styles.searchContainer}
    >
      <SearchIcon sx={{ fontSize: 30, color: '#7d6b91', margin: 1 }} />
      <GoogleMap>
        <Autocomplete
          options={options}
          bounds={mapBounds}
          onPlaceChanged={onPlaceChanged}
          onLoad={onLoadHandler}
        >
          <TextField
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
      <NavLink to="/locations">
        <Button
          sx={{ marginLeft: 1.5, textTransform: 'none', fontSize: 15, width: '90%', padding: 1.6 }}
          size="large"
          variant="contained"
        >
          Search
        </Button>
      </NavLink>
    </motion.div>
  );
}

export default React.memo(Search);
