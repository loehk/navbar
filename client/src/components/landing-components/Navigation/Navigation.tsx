import ProfileButton from "../../reusable-components/ProfileButton/ProfileButton"
import styles from "./Navigation.module.scss";
import Logo from "../../reusable-components/Logo/Logo"

type Props = {};

function Navigation({}: Props) {
  return (
    <nav className={styles.Navigation}>
      <Logo />
      <ProfileButton />
    </nav>
  );
}

export default Navigation;
