import styles from './SideBar.module.scss';

export default function ({ nearbyBars }: { nearbyBars: google.maps.places.PlaceResult[] | null }) {
  return (
    <div className={styles.SideBar}>
      <ul className={styles.barList}>
        {nearbyBars ? (
          nearbyBars.map(bar => (
            <li>
              <div className={styles.barImage}>
                {bar.photos?.[0] ? <img src={bar.photos[0].getUrl()} alt={bar.name} /> : null}
              </div>
              <div className={styles.barInfo}>
                <h4 className={styles.barName}>{bar.name}</h4>
                <p className={styles.barAddress}>{bar.vicinity}</p>
              </div>
            </li>
          ))
        ) : (
          <p>Loading bars...</p>
        )}
      </ul>
    </div>
  );
}
