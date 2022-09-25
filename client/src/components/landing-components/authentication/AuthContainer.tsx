import { useState } from 'react';
import LoginForm from './components/Login';
import SignupForm from './components/Register';
import styles from './AuthButton.module.scss';
import { AnimatePresence } from 'framer-motion';

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchModeHandler = () => {
    setIsLogin(prevMode => !prevMode);
  };

  return (
    <div className={styles.container}>
      <div className={styles.authContainer}>
        <div>
          <h1 className={styles.heading}>{isLogin ? 'Login' : 'Signup'}</h1>
        </div>
        <div className={styles.forms}>
          <AnimatePresence initial={false}>
            {isLogin ? <LoginForm /> : <SignupForm signedUp={setIsLogin} />}
          </AnimatePresence>
        </div>
      </div>
      <div className={styles.authChange}>
        <button onClick={switchModeHandler}>
          {isLogin ? 'Create a new account' : 'Login with an existing account'}
        </button>
      </div>
    </div>
  );
};

export default AuthContainer;
