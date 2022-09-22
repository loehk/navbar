import styles from './TopSection.module.scss';
import { motion } from 'framer-motion';

type Props = {};

function TopSection({}: Props) {
  return (
    <motion.div initial={{y: 100, opacity: 0.2}} animate={{y: 0, opacity: 1}}  transition={{ duration: 0.5}}  className={styles.topSectionWrapper}>
      <h1>
        find out where<p className={styles.highlight}> the party is.</p>
      </h1>
    </motion.div>
  );
}

export default TopSection;
