import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AuthContainer from './AuthContainer';
import styles from './AuthButton.module.scss';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import ProfileIcon from "./ProfileIcon";

const AuthModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {!localStorage.getItem("authUser") ? (
      <div>
        <Button onClick={handleOpen}>Sign in</Button>
        <Modal open={open} onClose={handleClose} 
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 600,
          }}>
          <Fade in={open}>
            <div className={styles.modal}>
                <AuthContainer />
            </div>
          </Fade>
        </Modal>
        </div>
      ) : (
        <div>
          <ProfileIcon />
          </div>
      )}
    </div>
  );
}

export default AuthModal;