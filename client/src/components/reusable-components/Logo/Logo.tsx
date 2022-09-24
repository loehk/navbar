import styles from "./Logo.module.scss"
import { useNavigate } from "react-router-dom";

type Props = {};

function Logo({}: Props) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className={styles.logoContainer} onClick={handleClick}>
      <img src="./icons/icon.svg" alt="logo" />
      <span>NavBar</span>
    </div>
  );
}

export default Logo;
