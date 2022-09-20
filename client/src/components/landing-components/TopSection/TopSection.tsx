import styles from "./TopSection.module.scss"

type Props = {};

function TopSection({}: Props) {
  return (
    <div className={styles.topSectionWrapper}>
      <h1>
        find out where<p className={styles.highlight}> the party is.</p>
      </h1>
    </div>
  );
}

export default TopSection;
