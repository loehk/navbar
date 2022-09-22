import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import styles from "./App.module.scss";
import Home from "../src/pages/home";
import { UserContext } from "./components/landing-components/authentication/UserContext";
import GoogleBarMap from './components/map-components/GoogleBarMap';

interface IUser {
  user: {
    username: string;
    email: string;
    profileImg: string;
  }  | null;
}

function App() {
  const [user, setUser] = useState<IUser>({user: null});

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <UserContext.Provider value={{user, setUser}}>
            <Route path="/" element={<Home />} caseSensitive={false} />
            <Route path="/home" element={<Home />} caseSensitive={false} />
            <Route path="/locations" element={<GoogleBarMap/>} caseSensitive={false} />
          </UserContext.Provider>
          // 404 not found goes here
          <Route path="*" caseSensitive={false} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
