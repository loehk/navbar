import styles from './LoadingScreen.module.scss';
import { motion } from 'framer-motion';

type Props = {};

const LoadingScreen = (props: Props) => {
  return (
    <div className={styles.LoadingScreenWrapper}>
      <motion.img animate={{ rotate: 360 }} transition={{ repeat: Infinity }} src="./icons/icon.svg" alt="NavBar logo" />
    </div>
  );
};

export default LoadingScreen;
