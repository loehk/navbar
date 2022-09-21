import { useState } from "react";
import axios from "axios";


interface userDataInterface {
    username: string;
    email: string;
    password: string;
    profilePicture: string;
}

const SignupForm = () => {
    const [userData, setUserData] = useState<userDataInterface>({
        username: "",
        email: "",
        password: "",
        profilePicture: ""
    });

    const handleChange = async (e: any) => {
        const { name, value } = e.target;

        if(name === "profilePicture"){
            const files = e.target.files;
            const data = new FormData();
            data.append("file", files[0]);
            data.append("upload_preset", "ml_default");
            const res = await axios.post("https://api.cloudinary.com/v1_1/dtpmwanpq/image/upload", data);
            setUserData({ ...userData, [name]: res.data.secure_url });
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
            <form className="register-form" onSubmit={handleSubmit}> 
                <input 
                    type="text"    
                    placeholder="Username" 
                    name="username"
                    value={userData.username}
                    required
                    className="register-form__input"
                    onChange={handleChange}
                    />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={userData.email}
                    required
                    className="register-form__input"
                    onChange={handleChange}
                    />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={userData.password}
                    required
                    className="register-form__input"
                    onChange={handleChange}
                    />
                    <input
                    type="file"
                    placeholder="Profile Picture"
                    name="profilePicture"
                    required
                    className="register-form__input"
                    onChange={handleChange}
                    />
                <button type="submit" className="register-form__button">Sign up</button>
            </form>
        </div>
    )
}

export default SignupForm;