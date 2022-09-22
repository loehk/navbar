import { motion } from 'framer-motion';
import styles from './SelectedBarContainer.module.scss';
import { Dispatch, SetStateAction } from 'react';

export default function ({
  selectedBar,
  setSelectedBar,
}: {
  selectedBar: google.maps.places.PlaceResult;
  setSelectedBar: Dispatch<SetStateAction<google.maps.places.PlaceResult | null>>;
}) {
  return (
    <motion.div
      className={styles.SelectedBarContainer}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <button onClick={() => setSelectedBar(null)}>go back</button>
      <h1>{selectedBar.name}</h1>
    </motion.div>
  );
}
