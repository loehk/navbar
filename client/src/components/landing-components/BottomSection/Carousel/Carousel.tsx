import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from './Carousel.module.scss';

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
          <img src="/img/carousel/carousel-3.jpeg" alt="Image of a bar" />
        </div>
        <div className={styles.carouselImg}>
          <img src="/img/carousel/carousel-1.jpeg" alt="Image of a bar" />
        </div>
        <div className={styles.carouselImg}>
          <img src="/img/carousel/carousel-2.jpeg" alt="Image of a bar" />
        </div>
      </Carousel>
    </div>
  );
};

export default PhotoCarousel;
