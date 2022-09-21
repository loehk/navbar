import Navigation from '../components/landing-components/Navigation/Navigation';
import TopSection from '../components/landing-components/TopSection/TopSection';
import BottomSection from '../components/landing-components/BottomSection/BottomSection';
import Search from '../components/landing-components/Search/Search';
import styles from './home.module.scss';

type Props = {};

const Home = (props: Props) => {
  return (
    <div className={styles.homeWrapper}>
      <Navigation />
      <TopSection />
      <Search />
      <BottomSection />
    </div>
  );
};

export default Home;
