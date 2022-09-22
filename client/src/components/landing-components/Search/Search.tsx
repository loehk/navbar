import styles from './Search.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, Button, Autocomplete } from '@mui/material';
import { motion } from 'framer-motion';
import { useJsApiLoader } from '@react-google-maps/api';
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
import { useState } from 'react';

type Props = {};

function Search({}: Props) {

  const [searchBox, setSearchBox] = useState(null);
  const onPlacesChanged = () => console.log(searchBox.getPlaces());
  const onSBLoad = ref => {
    setSearchBox(ref);
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    const crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);
  

  return (
      <motion.div
        initial={{ y: 100, opacity: 0.2 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={styles.searchContainer}
      >
        <SearchIcon sx={{ fontSize: 30, color: '#7d6b91', margin: 1.5 }} />
        <StandaloneSearchBox onPlacesChanged={onPlacesChanged} onLoad={onSBLoad}>
          <TextField
            sx={{
              width: '100%',
              '& .MuiInput-underline:before': { borderBottomColor: 'rgb(204, 202, 202)' },
              '& .MuiInput-underline:after': { borderBottomColor: '#7d6b91' },
            }}
            variant="standard"
            placeholder="Search"
          />
        </StandaloneSearchBox>
        <Button
          sx={{ marginLeft: 5, textTransform: 'none', fontSize: 15, width: '30%', padding: 1.6 }}
          size="large"
          variant="contained"
        >
          Search
        </Button>
      </motion.div>
  );
}

export default Search;
