const express=require("express");
const authRouter=express.Router();
const {validateSignUp}=require("../utils/validation.js");
const bcrypt=require("bcrypt");
const User = require("../models/user");

authRouter.post("/login",async(req,res)=>{
     
    try{
     const {email,password}=req.body;
        const user=await User.findOne({email:email});
        
        if(!user){
         throw new Error("USer not present");
        }
       
        const isValidPassword= await  user.validatePassword(password);
        if(isValidPassword){
         const token=await user.getJWT();
         res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)});
         res.send("Login successfully");
        }else{
         throw new Error("Password is not correct");
        }
      }catch(err){
       res.status(404).send("Error occured while login"+err);
      }
   
});

authRouter.post("/SignUp",async(req,res)=>{
    try{
      validateSignUp(req);
      const {firstname,lastname,email,password,gender,age}=req.body;
      const hashedPassword=await bcrypt.hash(password,10);
    const user=new User({firstname,lastname,email,password:hashedPassword,gender,age});
    await
    user.save();
    res.send("User saved successfully");
    }catch(err){
      res.send("Error occured "+err);
      
    }
});

authRouter.post("/logout",async(req,res)=>{
       res.cookie("token",null,{
        expires:new Date(Date.now())
       });
       res.send("Logged out successfully");
});
module.exports=authRouter;
