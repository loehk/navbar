import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';
import { UserContext } from '../landing-components/authentication/UserContext';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SettingsContainer = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userContext = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({
    email: userContext?.user?.email,
    username: userContext?.user?.username,
    profilePictureBase64: userContext?.user?.profilePictureBase64,
  });

  const handleChange = async (e: any) => {
    const { name, value } = e.target;

    if(name === "profilePictureBase64"){
        setLoading(true);
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "ml_default");
        await axios.post("https://api.cloudinary.com/v1_1/dtpmwanpq/image/upload", data)
        .then((res) => {
            setUserData({ ...userData, [name]: res.data.secure_url });
            setLoading(false);
        });
    }else{
        setUserData({ ...userData, [name]: value });
    }
};

const handlePasswordChange = (e:any) => {
  setPassword(e.target.value);
}

const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if(password !== ''){
        await axios.put("http://localhost:3000/user/updatePassword", {email: userContext?.user?.email, password: password});
      } 
      await axios.put("http://localhost:3000/user/update", userData)
      .then((res) => {
        localStorage.setItem('authUser', JSON.stringify(res.data));
        userContext?.setUser(res.data);
      });
    } catch (error) {
      console.log(error);
    }
};

const handleDelete = async (e: any) => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:3000/auth/logout");
    await axios.delete(`http://localhost:3000/user/delete/${userContext?.user?.email}` );
    localStorage.removeItem("authUser");
    if(userContext){
        userContext.setUser(null);
    }
    navigate("/");
  } catch (err) {
      console.log(err);
  }
};


  return (
    <Card sx={{ width: '100%', height:  '100%', boxShadow: 'none' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          User Settings
        </Typography>        
        <Typography variant="h5" component="div">
          Account {userContext?.user?.username}
        </Typography>
        <Typography variant="caption" component="div">
          Avatar
        </Typography>
        <Box sx={{display: "flex", alignItems: "center", padding: 2}}>
          <Avatar sx={{ width: 100, height: 100 }} alt={userContext?.user?.username} src={userContext?.user?.profilePictureBase64}/>
          <Box mt={2}  sx={{ marginLeft: 2, display: 'flex' }}>
                            <Button
                            variant="contained"
                            component="label"
                            >
                            Change
                                <input
                                type="file"
                                placeholder="Profile Picture"
                                name="profilePictureBase64"
                                hidden
                                required
                                onChange={handleChange}
                                />
                            </Button>
                    </Box>
        </Box>
        <Divider variant="middle" />
        <Box sx={{display: 'flex', margin: 2}}>
        <Box mt={2}>
            <TextField
                id="outlined-basic"
                label="Username"
                type="username"            
                name="username"
                onChange={handleChange}
            />
        </Box>        
        <Box mt={2} sx= {{marginLeft: 5}}>
            <TextField
                id="outlined-basic"
                label="Email"
                type="email"            
                name="email"
                onChange={handleChange}
            />
        </Box>
        </Box>
        <Divider variant="middle" />
        <Box mt={2} sx={{display: 'flex', margin: 2}}>
          <TextField
                      id="outlined-password-input"
                      label="Password"
                      type="password"
                      autoComplete="current-password"                    
                      name="password"
                      onChange={handlePasswordChange}
                  />
          </Box>
        <Divider variant="middle" />
        <Box mt={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 2}}>
        <Typography  variant="caption" component="div">
          Delete account
        </Typography>
        <Button size='small' onClick={handleDelete}>Delete</Button>
        </Box>
      </CardContent>
      <CardActions sx={{display: 'flex', justifyContent: 'end', marginRight: 2}}>
      <Button disabled={loading ? true : false} variant="contained" color="success" onClick={handleSubmit} >
          {loading ? <CircularProgress color="inherit" /> : "Save changes"}
      </Button>
      </CardActions>
    </Card>
  );
}

export default SettingsContainer;