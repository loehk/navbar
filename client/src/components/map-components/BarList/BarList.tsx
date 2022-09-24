import styles from './BarList.module.scss';

export default function BarList({ nearbyBars }: { nearbyBars: google.maps.places.PlaceResult[] }) {
  return (
    <div className={styles.BarListContainer}>
      <div className={styles.BarsNearby}>
        <p>Bars Nearby</p>
      </div>
      <ul className={styles.BarList}>
        {nearbyBars.map(bar => (
          <li key={bar.place_id}>
            <div className={styles.barImage}>
              {bar.photos?.[0] ? <img src={bar.photos[0].getUrl()} alt={bar.name} /> : null}
            </div>
            <div className={styles.barInfo}>
              <h4 className={styles.barName}>{bar.name}</h4>
              <p className={styles.barAddress}>{bar.vicinity}</p>
              <div className={styles.bottomContainer}>
                {bar.price_level ? (
                  <div className={styles.dollarIconContainer}>
                    {Array(bar.price_level)
                      .fill('')
                      .map((_, index) => (
                        <span key={index}>
                          <img
                            className={styles.dollarIcon}
                            src="/icons/dollar-icon.svg"
                            alt="dollar icon"
                          />
                        </span>
                      ))}
                  </div>
                ) : null}
                <p
                  className={
                    styles.barOpenText + (bar.opening_hours?.open_now ? '' : ` ${styles.barClosed}`)
                  }
                >
                  {bar.opening_hours?.open_now ? 'Open now!' : 'Closed'}
                </p>
                {/* <p className={styles.barDistance}></p> */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
