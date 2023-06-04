import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config({path:"../../config.env"});
const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  birthdate:{
    type:Date,
    required:true,
  },
  gender:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  cpassword:{
    type:String,
    required:true,
  },
  cast:{
    type:String,
    required:true
  },
  income:{
    type:String,
    required:true
  },
  occupation:{
    type:String,
    required:true
  },
  tokens:[
    {
      token:{
        type:String,
        required:true
      }
    }
  ]
});

userSchema.pre('save',async function(next){
    // console.log("this is pre method");
    if(this.isModified('password')){
       this.password=await bcrypt.hash(this.password,12);
       this.cpassword=await bcrypt.hash(this.cpassword,12);
    }
    next();
})

userSchema.methods.generateAuthToken=async function(){
    try{
       let token=await jwt.sign({_id:this._id},process.env.SECRET_KEY);
       console.log(process.env.SECRET_KEY);
       this.tokens=this.tokens.concat({token:token});
       await this.save();
       return token;
    }
    catch(e){
      console.log(e);
    }
}
const User=mongoose.model('USER',userSchema);
export default User;
// module.exports=User;