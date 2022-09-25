import { motion } from 'framer-motion';
import styles from './SelectedBarContainer.module.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import OpeningHours from './OpeningHours/OpeningHours';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface OpeningHoursDay {
  start: Date;
  end: Date;
}

export interface LocationObj {
  name: string;
  latitude: number;
  longitude: number;
  place_id: string;
  email?: string;
  phoneNumber?: string;
  website?: string;
  address: string;
  photos: string[];
  opening_hours: {
    normal_days: {
      monday: OpeningHoursDay;
      tuesday: OpeningHoursDay;
      wednesday: OpeningHoursDay;
      thursday: OpeningHoursDay;
      friday: OpeningHoursDay;
      saturday: OpeningHoursDay;
      sunday: OpeningHoursDay;
    };
  };
}

export default function ({
  map,
  selectedBarId,
  setSelectedBarId,
}: {
  map: google.maps.Map;
  selectedBarId: string;
  setSelectedBarId: Dispatch<SetStateAction<string | null>>;
}) {
  const [fetchedBar, setFetchedBar] = useState<google.maps.places.PlaceResult | null>(null);

  useEffect(() => {
    new google.maps.places.PlacesService(map).getDetails(
      {
        placeId: selectedBarId,
        fields: ['name', 'photos', 'opening_hours'],
      },
      (place, status) => {
        if (status === 'OK') {
          setFetchedBar(place);
        }
      },
    );
  }, [selectedBarId]);

  return (
    <motion.div
      className={styles.SelectedBarContainer}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {fetchedBar ? (
        <>
          {fetchedBar.photos ? (
            <img className={styles.mainImage} src={fetchedBar.photos[0].getUrl()} alt="bar photo" />
          ) : (
            <div className={styles.noImage}>No Image</div>
          )}
          <div className={styles.infoContainer}>
            <h1 className={styles.barName}>{fetchedBar.name}</h1>
            <OpeningHours weekday_text={fetchedBar.opening_hours?.weekday_text} />
          </div>
        </>
      ) : (
        'Loading..'
      )}
      <div className={styles.buttonContainer}>
        <Button
          size="large"
          variant="outlined"
          sx={{ color: '#272838', borderColor: '#7d6b91' }}
          onClick={() => setSelectedBarId(null)}
        >
          go back
        </Button>
        <Link to="/">
          <Button
            size="large"
            variant="outlined"
            sx={{ color: '#272838', borderColor: '#7d6b91' }}
            onClick={() => setSelectedBarId(null)}
          >
            search
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
