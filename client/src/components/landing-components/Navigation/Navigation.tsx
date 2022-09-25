import styles from './Navigation.module.scss';
import Logo from '../../reusable-components/Logo/Logo';
import AuthButton from '../authentication/AuthButton';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

type Props = {};

function Navigation({}: Props) {
  return (
    <nav className={styles.Navigation}>
      <Logo />
      <div className={styles.buttonGroup}>
        <NavLink to="#about">
          <Button
            onClick={() => {
              window.scrollTo({top: 550, left: 0, behavior: 'smooth' });
            }}
            sx={{ color: '#5d536b' }}
          >
            HELP
          </Button>
        </NavLink>
        <AuthButton />
      </div>
    </nav>
  );
}

export default Navigation;
