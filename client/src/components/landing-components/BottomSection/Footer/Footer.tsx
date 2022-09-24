import styles from './Footer.module.scss';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.innerContainer}>
        <h2>Never miss out again</h2>
        <p>
          With NavBar, you will never miss another night out! Go out, have a good time and save some
          money at the same time!
        </p>
        <Fab
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }}
          variant="extended"
          sx={{ backgroundColor: "rgb(195, 189, 221)", fontWeight: "bold"}}
        >
          <NavigationIcon sx={{ mr: 1, color: "#7d6b91"}} />
          back top
        </Fab>
      </div>
    </footer>
  );
};

export default Footer;
