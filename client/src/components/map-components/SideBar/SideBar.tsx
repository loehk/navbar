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
  setSelectedBar
}: {
  setSelectedBar: Dispatch<SetStateAction<google.maps.places.PlaceResult | null>>;
  map: google.maps.Map;
  nearbyBars: google.maps.places.PlaceResult[] | null;
  selectedBarId: string | null;
  setSelectedBarId: Dispatch<SetStateAction<string | null>>;
}) {
  return (
    <div className={styles.SideBar}>
      {nearbyBars ? <BarList onClick={(bar: google.maps.places.PlaceResult)=>{
        setSelectedBar(bar)
        setSelectedBarId(bar.place_id!)
        }} nearbyBars={nearbyBars} /> : <p>Loading bars...</p>}
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
