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
  const { name, photos } = selectedBar;

  return (
    <motion.div
      className={styles.SelectedBarContainer}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <button onClick={() => setSelectedBar(null)}>go back</button>
      {photos ? (
        <img className={styles.mainImage} src={photos[0].getUrl()} alt="bar photo" />
      ) : null}
      <div className={styles.infoContainer}>
        <h1 className={styles.barName}>{name}</h1>
      </div>
    </motion.div>
  );
}
