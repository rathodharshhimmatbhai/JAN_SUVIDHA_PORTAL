import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";
import dotenv from "dotenv";
dotenv.config({path:"../../config.env"});
const Authenticate=async(req,res,next)=>{
    try{
        const token=req.cookies.jwttoken;
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
        const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token});
        // console.log(rootUser);
        if(!rootUser){ throw new Error('User not found')}
        req.token=token;
        req.rootUser=rootUser;
        req.userID=rootUser._id;
        next();
    }
    catch(e){
        res.status(401).send("Unauthorized:No Token Provided");
        console.log(err);
    }
}
export default Authenticate;