import Navigation from "../landing-components/Navigation/Navigation"
import NestedList from "./OptionList";
import styles from "../../pages/home.module.scss";
import Container from '@mui/material/Container';
import SettingsContainer from "./SettingsContainer";

const UserSettings = () => {


    return (
        <div className={styles.homeWrapper}>
            <Navigation />
            <Container maxWidth="xl" sx={{ display: 'flex', height: '75%', marginTop: 5  }}>
                    <NestedList />
                    <SettingsContainer />
            </Container>
        </div>
    )
}

export default UserSettings
