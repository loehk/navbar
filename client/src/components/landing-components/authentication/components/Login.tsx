import axios from "axios";
import { useState } from "react";

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
            <form className="register-form" onSubmit={handleSubmit}> 
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
                <button type="submit" className="register-form__button">Sign in</button>
            </form>
        </div>
    )
}

export default LoginForm;