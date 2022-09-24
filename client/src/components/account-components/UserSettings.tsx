import Navigation from '../landing-components/Navigation/Navigation';
import OptionList from './OptionList';
import styles from '../../pages/home.module.scss';
import Container from '@mui/material/Container';
import SettingsContainer from './SettingsContainer';
import AdminContainer from './admin-panel-components/AdminContainer';
import { useState } from 'react';

const UserSettings = () => {
  const [option, setOption] = useState('user');

  const handleOptionChange = () => {
    switch (option) {
      case 'user':
        return <SettingsContainer />;
      case 'admin':
        return <AdminContainer />;
    }
  };

  return (
    <div className={styles.homeWrapper}>
      <Navigation />
      <Container maxWidth="xl" sx={{ display: 'flex', height: '75%', marginTop: 5 }}>
        <OptionList setOption={setOption} />
        {handleOptionChange()}
      </Container>
    </div>
  );
};

export default UserSettings;
