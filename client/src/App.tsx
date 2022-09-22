import { Route, Routes, BrowserRouter } from "react-router-dom";
import styles from "./App.module.scss";
import Home from "../src/pages/home";
import { UserContextProvider  } from "./components/landing-components/authentication/UserContext";
import GoogleBarMap from './components/map-components/GoogleBarMap';
import UserSettings from './components/account-components/UserSettings';


function App() {
  return (
    <div className={styles.App}>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} caseSensitive={false} />
            <Route path="/home" element={<Home />} caseSensitive={false} />
            <Route path="/locations" element={<GoogleBarMap/>} caseSensitive={false} />
            <Route path="/settings" element={<UserSettings/>} caseSensitive={false} />
          // 404 not found goes here
          <Route path="*" caseSensitive={false} />
        </Routes>
      </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
