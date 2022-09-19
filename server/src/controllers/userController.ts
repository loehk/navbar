import userModel from "../models/userModel";

export const getUsers = async (req: any, res: any) => {
    try{
        const users = await userModel.find();
        res.status(200).json(users);
    }catch(err){
        console.log(err);
    }
}