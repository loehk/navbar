import Navigation from '../components/landing-components/Navigation/Navigation';
import TopSection from "../components/landing-components/TopSection/TopSection"
import BottomSection from "../components/landing-components/BottomSection/BottomSection"
import styles from './home.module.scss';

type Props = {};

const Home = (props: Props) => {
  return (
    <div className={styles.homeWrapper}>
      <Navigation />
      <TopSection />
      <BottomSection />
    </div>
  );
};

export default Home;
