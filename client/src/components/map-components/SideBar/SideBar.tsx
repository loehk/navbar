import BarList from '../BarList/BarList';
import SelectedBarContainer from '../SelectedBarContainer/SelectedBarContainer';
import styles from './SideBar.module.scss';
import { Dispatch, SetStateAction } from 'react';
import { AnimatePresence } from 'framer-motion';

export default function ({
  map,
  nearbyBars,
  selectedBarId,
  setSelectedBarId,
}: {
  map: google.maps.Map;
  nearbyBars: google.maps.places.PlaceResult[] | null;
  selectedBarId: string | null;
  setSelectedBarId: Dispatch<SetStateAction<string | null>>;
}) {
  return (
    <div className={styles.SideBar}>
      {nearbyBars ? <BarList nearbyBars={nearbyBars} /> : <p>Loading bars...</p>}
      <AnimatePresence mode="wait">
        {selectedBarId ? (
          <SelectedBarContainer
            map={map}
            selectedBarId={selectedBarId}
            setSelectedBarId={setSelectedBarId}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
