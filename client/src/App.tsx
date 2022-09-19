import { Route, Routes, BrowserRouter } from "react-router-dom";
import styles from "./App.module.scss";
import Home from "../src/pages/home";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} caseSensitive={false} />
          <Route path="/home" element={<Home />} caseSensitive={false} />
          <Route path="/locations" caseSensitive={false} />
          
          // 404 not found goes here
          <Route path="*" caseSensitive={false} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
