import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from './Carousel.module.scss';
import { motion } from 'framer-motion';

const PhotoCarousel = () => {
  return (
    <div className={styles.carouselWrapper}>
      <Carousel
        autoPlay={true}
        interval={7000}
        stopOnHover={false}
        infiniteLoop={true}
        dynamicHeight={false}
        showStatus={false}
        showArrows={false}
        showThumbs={false}
        showIndicators={false}
      >
        <div className={styles.carouselImg}>
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            src="/img/carousel/carousel-3.jpeg"
            alt="Image of a bar"
          />
        </div>
        <div className={styles.carouselImg}>
          <motion.img src="/img/carousel/carousel-1.jpeg" alt="Image of a bar" />
        </div>
        <div className={styles.carouselImg}>
          <motion.img src="/img/carousel/carousel-2.jpeg" alt="Image of a bar" />
        </div>
      </Carousel>
    </div>
  );
};

export default PhotoCarousel;
