import axios from "axios";
import { useState } from "react";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import styles from '../AuthButton.module.scss';
import Box from '@mui/material/Box';

interface onChangeInterface {
    target:{
        name: string;
        value: string;
    }
}

interface userDataInterface {
    email: string;
    password: string;
}

const LoginForm = () => {
    const [userData, setUserData] = useState<userDataInterface>({
        email: "",
        password: ""
    });

    const handleChange = (e: onChangeInterface) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/auth/login", userData)
                .then((res) => {
                    localStorage.setItem("authUser", JSON.stringify(res.data));
                });
                console.log(JSON.parse(localStorage.getItem("authUser") || "{}"));
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
                    <Box mt={2}>
                    <Button  type="submit" variant="contained" color="success">
                        Log in
                    </Button>
                    </Box>
            </form>
        </div>
    )
}

export default LoginForm;