import styles from "./Logo.module.scss"

type Props = {};

function Logo({}: Props) {
  return (
    <div className={styles.logoContainer}>
      <img src="./icons/icon.svg" alt="logo" />
      <span>NavBar</span>
    </div>
  );
}

export default Logo;
