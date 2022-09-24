import { useState } from "react";
import LoginForm from "./components/Login";
import SignupForm from "./components/Register";
import  styles  from "./AuthButton.module.scss";

const AuthContainer = () => {
    const [isLogin, setIsLogin] = useState(true);
    
    const switchModeHandler = () => {
        setIsLogin((prevMode) => !prevMode);
    };
    
    return (
        <div>
                <div className={styles.container}>
                    <div className={styles.authContainer}>
                        <div>
                            <h1 className={styles.heading}>{isLogin ? "Login" : "Signup"}</h1>
                        </div>
                        <div className={styles.forms}>
                            {isLogin ? <LoginForm /> : <SignupForm signedUp={setIsLogin}/>}
                        </div>
                    </div>
                    <div className={styles.authChange}>
                        <button onClick={switchModeHandler}>
                            {isLogin ? "Create a new account" : "Login with existing account"}
                        </button>
                    </div>
                </div>
        </div>
    );
    }

export default AuthContainer;