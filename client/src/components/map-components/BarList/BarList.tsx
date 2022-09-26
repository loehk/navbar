import { ListItemButton } from '@mui/material';
import { useState } from 'react';
import styles from './BarList.module.scss';

export default function BarList({
  nearbyBars,
  onClick,
}: {
  onClick: Function;
  nearbyBars: google.maps.places.PlaceResult[];
}) {
  const [additionalBarInfo, setAdditionalBarInfo] = useState(null); 

  const defaultImage = (
    <div className={styles.defaultImage}>
      <img src="./public/icons/coctail-icon.svg" alt="Icon with a drink" />
    </div>
  );

  return (
    <div className={styles.BarListContainer}>
      <div className={styles.BarsNearby}>
        <p>Bars Nearby</p>
      </div>
      <ul className={styles.BarList}>
        {nearbyBars.map(bar => (
          <ListItemButton
            key={bar.place_id}
            onClick={() => {
              onClick(bar);
            }}
          >
          <li>
            <div className={styles.barImage}>
                {bar.photos?.[0] ? (
                  <img src={bar.photos[0].getUrl()} alt={bar.name} />
                ) : (
                  defaultImage
                )}
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
                    styles.barOpenText + (bar.opening_hours?.isOpen ? '' : ` ${styles.barClosed}`)
                  }
                >
                  {bar.opening_hours?.isOpen ? 'Open now!' : 'Closed'}
                </p>
                {/* <p className={styles.barDistance}></p> */}
              </div>
            </div>
          </li>
          </ListItemButton>
        ))}
      </ul>
    </div>
  );
}
