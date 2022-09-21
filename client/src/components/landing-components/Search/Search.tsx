import styles from './Search.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, Button, Autocomplete } from '@mui/material';
import { motion } from 'framer-motion';
import { useJsApiLoader } from '@react-google-maps/api';
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
import { useState } from 'react';

type Props = {};

function Search({}: Props) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAP_KEY,
    libraries: ['places'],
  });

  const [searchBox, setSearchBox] = useState(null);
  const onPlacesChanged = () => console.log(searchBox.getPlaces());
  const onSBLoad = ref => {
    setSearchBox(ref);
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_KEY} libraries={['places']}>
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
          sx={{ marginLeft: 5, textTransform: 'none', fontSize: 15, width: '45%', padding: 1.6 }}
          size="large"
          variant="contained"
        >
          Search
        </Button>
      </motion.div>
    </LoadScript>
  );
}

export default Search;
