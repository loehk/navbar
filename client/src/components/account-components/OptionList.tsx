import {Dispatch, useState} from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useContext } from 'react';
import { UserContext } from '../landing-components/authentication/UserContext';
import axios from "axios";
import { useNavigate } from "react-router";

type Props = {
  setOption: (active: string) => void;
}

const OptionList = (setOption: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const userContext = useContext(UserContext);

  const handleClick = () => {
    setOpen(!open);
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

const handleAdminSettings = () => {
    setOption.setOption("admin");
}

const handleUserSettings = () => {
    setOption.setOption("user");
}

  return (
    <List
      sx={{ width: '100%', maxWidth: 200, height: 'auto', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
            User tools
        </ListSubheader>
      }
    >
    {userContext?.user?.isAdmin ?
    <ListItemButton onClick={handleAdminSettings}>
        <ListItemText primary="Admin panel" />
      </ListItemButton>
    : null}
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Profile" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton onClick={handleUserSettings} sx={{ pl: 4 }}>
            <ListItemText primary="User settings" />
          </ListItemButton>
          <ListItemButton  onClick={handleLogout} sx={{ pl: 4 }}>
            <ListItemText primary="Log out" />  
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

export default OptionList;