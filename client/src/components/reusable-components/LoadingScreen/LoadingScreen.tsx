import styles from "./LoadingScreen.module.scss";

type Props = {}

const LoadingScreen = (props: Props) => {
  return (
    <div className={styles.LoadingScreenWrapper}>LOADING...</div>
  )
}

export default LoadingScreen