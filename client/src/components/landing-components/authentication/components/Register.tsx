import { useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import styles from  '../AuthButton.module.scss'


interface userDataInterface {
    username: string;
    email: string;
    password: string;
    profilePictureBase64: string;
}

const SignupForm = () => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState<userDataInterface>({
        username: "",
        email: "",
        password: "",
        profilePictureBase64: ""
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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/auth/register", userData);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <form className={styles.authForm} onSubmit={handleSubmit}> 
                <Box mt={2}>
                <TextField
                                id="outlined-basic"
                                label="Username"
                                type="username"            
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                            />
                </Box>
                <Box mt={2}>
                <TextField
                                id="outlined-basic"
                                label="Email"
                                type="email"            
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                            />
                    </Box>
                    <Box mt={2}>
                    <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"                    
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                            />
                    </Box>
                    <Box mt={2}  sx={{ display: 'flex' }}>
                            <Button
                            variant="contained"
                            component="label"
                            >
                            Upload File
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
                    <Box mt={2}>
                        { loading ?
                            <Skeleton width={104} height={71} />
                            :
                            <Button  type="submit" variant="contained" color="success" >
                                Sign up
                            </Button>
                        }
                    </Box>
            </form>
        </div>
    )
}

export default SignupForm;