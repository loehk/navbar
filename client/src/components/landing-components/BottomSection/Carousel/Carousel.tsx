import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from './Carousel.module.scss';

const PhotoCarousel = () => {
  return (
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
        <img src="../../../../public/img/carousel/carousel-3.jpeg" />
      </div>
      <div className={styles.carouselImg}>
        <img src="../../../../public/img/carousel/carousel-1.jpeg" />
      </div>
      <div className={styles.carouselImg}>
        <img src="../../../../public/img/carousel/carousel-2.jpeg" />
      </div>
    </Carousel>
  );
};

export default PhotoCarousel;
