import BarList from '../BarList/BarList';
import SelectedBarContainer from '../SelectedBarContainer/SelectedBarContainer';
import styles from './SideBar.module.scss';
import { Dispatch, SetStateAction } from 'react';
import { AnimatePresence } from 'framer-motion';

export default function ({
  nearbyBars,
  selectedBar,
  setSelectedBar,
}: {
  nearbyBars: google.maps.places.PlaceResult[] | null;
  selectedBar: google.maps.places.PlaceResult | null;
  setSelectedBar: Dispatch<SetStateAction<google.maps.places.PlaceResult | null>>;
}) {
  return (
    <div className={styles.SideBar}>
      {nearbyBars ? <BarList nearbyBars={nearbyBars} /> : <p>Loading bars...</p>}
      <AnimatePresence mode="wait">
        {selectedBar ? (
          <SelectedBarContainer selectedBar={selectedBar} setSelectedBar={setSelectedBar} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
