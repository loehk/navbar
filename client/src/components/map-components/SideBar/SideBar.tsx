import BarList from '../BarList/BarList';
import styles from './SideBar.module.scss';

export default function ({ nearbyBars }: { nearbyBars: google.maps.places.PlaceResult[] | null }) {
  return (
    <div className={styles.SideBar}>
      {nearbyBars ? <BarList nearbyBars={nearbyBars} /> : <p>Loading bars...</p>}
    </div>
  );
}
