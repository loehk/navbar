import React from 'react';
import styles from './About.module.scss';

type Props = {};

function About({}: Props) {
  return (
    <section className={styles.aboutWrapper}>
      <h5>HAPPY HOURS FOR HAPPY TIMES</h5>
      <h3>See what's happening near you! 🍹</h3>
      <p>
        See which happy hours others have tagged around you - or register and tag it yourself! To
        open the map, press "Search" to see your nearby bars or enter a bar using autocomplete.
      </p>
      <div>
        <img src="./icons/coctail-icon.svg" />
      </div>
    </section>
  );
}

export default About;
