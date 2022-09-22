import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styles from './AuthButton.module.scss';

const ProfileIcon = () => {
    const userContext = useContext(UserContext);
    const [openMenu, setOpenMenu] = useState(null);
    const open = Boolean(openMenu);
    const handleClick = (e: any) => {
        setOpenMenu(e.currentTarget);
    };
    const handleClose = () => {
        setOpenMenu(null);
    };

    const handleLogout = async () => {
        try{
            await axios.post("http://localhost:3000/auth/logout");
            localStorage.removeItem("authUser");
            if(userContext){
                userContext.setUser(null);
            }
        }catch(err){
            console.log(err);
        }
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <img className={styles.profileImg} src={userContext?.user?.profilePictureBase64}/> 
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={openMenu}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default ProfileIcon;