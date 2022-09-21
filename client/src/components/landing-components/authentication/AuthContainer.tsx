import { useState } from "react";
import LoginForm from "./components/Login";
import SignupForm from "./components/Register";
import axios from "axios";

const AuthContainer = () => {
    const [isLogin, setIsLogin] = useState(true);
    
    const switchModeHandler = () => {
        setIsLogin((prevMode) => !prevMode);
    };

    const handleLogout = async () => {
        try{
            await axios.post("http://localhost:3000/auth/logout");
            localStorage.removeItem("authUser");
        }catch(err){
            console.log(err);
        }
    };
    
    return (
        <div>
            {!localStorage.getItem("authUser") ? (
            <div className="auth-container">
            <div className="auth-container__form">
                <div className="auth-container__form__header">
                <h1>{isLogin ? "Login" : "Signup"}</h1>
                </div>
                <div className="auth-container__form__body">
                {isLogin ? <LoginForm /> : <SignupForm />}
                </div>
                <div className="auth-container__form__footer">
                <button onClick={switchModeHandler}>
                    {isLogin ? "Create a new account" : "Login with existing account"}
                </button>
                </div>
            </div>
            </div>
        ) : (
            <div>
                <h1>Logged in</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
        )}
        </div>
    );
    }

export default AuthContainer;