import mongoose from "mongoose";

const dbConnection = () => {
    try{
        if(process.env.MONGO_URI){
            mongoose.connect(process.env.MONGO_URI);
            console.log("MongoDB connected");
        }else{
            console.log("MongoDB connection failed");
        }
    }catch(err){
        console.log(err);
    }
}

export default dbConnection;