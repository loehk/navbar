import styles from "./BottomSection.module.scss"
import PhotoCarousel from "./Carousel/Carousel"

type Props = {}

function BottomSection({}: Props) {
  return (
    <div className={styles.bottomSectionContainer}>
      <PhotoCarousel/>
    </div>
  )
}

export default BottomSection