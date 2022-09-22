import styles from "./Navigation.module.scss";
import Logo from "../../reusable-components/Logo/Logo"
import AuthButton from "../authentication/AuthButton";

type Props = {};

function Navigation({}: Props) {
  return (
    <nav className={styles.Navigation}>
      <Logo />
      <AuthButton />
    </nav>
  );
}

export default Navigation;
