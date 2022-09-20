import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

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
      <div>
        <img src="../../../../public/img/carousel/carousel-1.jpg" />
      </div>
      <div>
        <img src="../../../../public/img/carousel/carousel-2.jpg" />
      </div>
      <div>
        <img src="../../../../public/img/carousel/carousel-3.jpg" />
      </div>
    </Carousel>
  );
};

export default PhotoCarousel;
