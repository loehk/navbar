import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        content: '""',
      },
    },
  }));

const ProfileIcon = () => {
    const navigate = useNavigate();

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
            navigate("/");
        }catch(err){
            console.log(err);
        }
    };

    const openSettings = () => {
        navigate("/settings");
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar alt={userContext?.user?.username} src={userContext?.user?.profilePictureBase64}/>
                </StyledBadge>
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
                <MenuItem onClick={openSettings}>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default ProfileIcon;