import axios from "axios";
import { useState, useEffect } from "react";

const ProfileIcon = () => {

    const handleLogout = async () => {
        try{
            await axios.post("http://localhost:3000/auth/logout");
            localStorage.removeItem("authUser");
        }catch(err){
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Logged in</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default ProfileIcon;