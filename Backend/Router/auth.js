import express from "express";
import "../DB/conn.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/userSchema.js"
import Authenticate from "../middleware/Authenticate.js";

import GENERAL,{OBC,SC,ST} from "./DATA.js";
const router=express.Router();
let username="user";
let Cast="general";
let income="100000";
let occupation="student";
let login="login";

router.get('/', (req, res) => {
      login="login";
      res.render('login');
});
router.get('/login',async(req,res)=>{
      res.render('login');
})
router.get('/register', (req, res) => {
      res.render('register');
});
router.get('/index',async(req,res)=>{
      login="logout";
      console.log(Cast.toLowerCase());
      if(Cast.toLowerCase()==="general"){
      res.render('index',{arr:GENERAL,login,user:username,income,Cast,occupation});
      }
      else if(Cast.toLowerCase()=='obc'){
        res.render('index',{arr:OBC,login,user:username,income,Cast,occupation});
      }
      else if(Cast.toLowerCase()=='sc'){
        res.render('index',{arr:SC,login,user:username,income,Cast,occupation});
      }
      else{
        res.render('index',{arr:ST,login,user:username,income,Cast,occupation});
      }
})
router.post("/register", async(req,res)=>{
    console.log(req.body);
    const{ name,email,birthdate,gender,password,cpassword,cast,income,occupation}=req.body;
    if(!name || !email || !birthdate || !gender || !password || !cpassword || !cast || !income || !occupation){
        return res.status(404).json({error:"Please fill reuired field"});
    }
    try{
        const userExist=await User.findOne({ email: email});
        if(userExist){
            return res.status(422).json({error:"This Email is already Exists"});
        }
        const user=new User({name,email,birthdate,gender,password,cpassword,cast,income,occupation});
        const Data=await user.save();
        
        console.log(Data);
        if(Data){
            res.status(201).json({message:"user registered successfully"});
        }
        else{
            res.status(500).json({error:"failed to registration"});
        }
    }
    catch(e){
        console.log(e);
    }
});
router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    // console.log(`your email is ${email} and your password is ${password}`);
    if(!email || !password){
        return res.status(404).json({error:"Please Enter valid Details"});
    }
   
    const Data=await User.findOne({email:email});
    if(Data){
        username=Data.name;
        income=Data.income;
        occupation=Data.occupation;
        Cast=Data.cast;
        const isValid=await bcrypt.compare(password,Data.password);
        const token=await Data.generateAuthToken();
        console.log(token);
        res.cookie("jwttoken",token,{
            expires:new Date(Date.now() + 2589200),
            httpOnly : true
        })
        if(isValid){
            res.status(202).send({message:"User is valid",status:202});
        }
        else{
            res.status(404).json({message:"User is not valid",status:404});
        }
    }
    else{
         res.status(404).json({message:"user credentials are wrong"});
    }
})
// router.post("/index",Authenticate,(req,res)=>{
//       res.send(req.rootUser);
// })
export default router;