import styles from './BottomSection.module.scss';
import PhotoCarousel from './Carousel/Carousel';
import { motion } from 'framer-motion';

type Props = {};

function BottomSection({}: Props) {

  return (
    <>
      <motion.div
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 50 }}
        className={styles.bottomSectionContainer}
      >
        <PhotoCarousel />
      </motion.div>
    </>
  );
}

export default BottomSection;
