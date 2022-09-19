import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel';

export const register = async (req: any, res: any) => {
    const {username, email, password} = req.body;

    try{
        const user = await userModel.findOne({email});
        if(user){
            res.status(400).json({message: "User already exists"});
        }else{
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = await userModel.create({
                username,
                email,
                password: hashedPassword
            });
            if(newUser){
                res.status(201).json({message: "User created successfully"});
            }else{
                res.status(400).json({message: "Invalid user data"});
            }
        }
    }catch(err){
        console.log(err);
    }
}

export const login = async (req: any, res: any) => {
    const {email, password} = req.body;

    try{
        const user = await userModel.findOne({email});
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                if(process.env.JWT_SECRET){
                    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
                    res.status(200).json({token});
                }else{
                    res.status(500).json({message: "Server error"});
                }
            }else{
                res.status(400).json({message: "Invalid credentials"});
            }
        }else{
            res.status(400).json({message: "Invalid credentials"});
        }
    }catch(err){
        console.log(err);
    }
}

export const logout = async (req: any, res: any) => {
    try{
        res.clearCookie('token');
        res.status(200).json({message: "Logged out successfully"});
    }catch(err){
        console.log(err);
    }
}