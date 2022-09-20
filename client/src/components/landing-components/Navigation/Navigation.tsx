import ProfileButton from "../../reusable-components/ProfileButton"
import styles from "./Navigation.module.scss";

type Props = {};

function Navigation({}: Props) {
  return (
    <nav className={styles.Navigation}>
      <img src="./img/logo.png" alt="NavBar logo"/>
      <ProfileButton />
    </nav>
  );
}

export default Navigation;
