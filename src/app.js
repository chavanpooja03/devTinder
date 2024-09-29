const express=require("express");
const bodyParser = require('body-parser');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser");
//const authUser=require("./middleware/auth.js")
const connectMongoDb=require("./config/database");
const {validateSignUp}=require("./utils/validation.js");
const User = require("./models/user");
const authUser=require("./middleware/auth.js");

const app=express();
app.use(cookieParser());
app.use(bodyParser.json()); 
app.use(express.json());
app.get("/user",async(req,res)=>{
    const firstName=req.body.firstname;
    try{
     const users=await User.find({firstname:firstName})
     if(users.length===0){
      res.send("User not found");
     }else{
      console.log(users);
      res.send("User found");
     }
    }catch(err){
        res.status(404).send("404 error not found");
    }
});
app.get("/feed",async(req,res)=>{

 try{
  const user=await User.find({});
  res.send(user);
 }catch(err){
 res.send("Something went wrong");
 }
});
app.delete("/user",async(req,res)=>{
  const id=req.body._id;
  try{
     const users=await User.findByIdAndDelete(id);
     if(!users){
     res.send("User deleted successfully");
     }else{
      res.send("Problem in deleting user");
     }
  }catch(err){
       res.send("Something went wrong"+err);
  }

});
app.patch("/user/:userId",async(req,res)=>{
  const userId=req.params?.userId;
  const data=req.body;
  try{
      const Allowed_updates=["firstname","lastname","password","gender","age","email"];
      const isAllowedUpdate=Object.keys(data).every((k)=>Allowed_updates.includes(k));
      if(!isAllowedUpdate){
         throw new Error("Update not allowed");
      }
      if(data?.password.length>10){
       throw new Error("Password characters between 0 to 9");
      }
      const users=await User.findByIdAndUpdate(userId,data,{
        runValidators:true,
        returnDocument:"after"
      });
      console.log(users);
      res.send("User updated successfully");
      
  }catch(err){
      res.send("Something went wrong:"+err);
  }
})

app.post("/SignUp",async(req,res)=>{
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

app.post("/login",async(req,res)=>{
     
 try{
  const {email,password}=req.body;
     const user=await User.findOne({email:email});
     
     if(!user){
      throw new Error("USer not present");
     }
    
     const isValidPassword= await bcrypt.compare(password,user.password)
     if(isValidPassword){
      const token=await jwt.sign({_id:user._id},"DEV@Tinder*",{expiresIn:"1d",});
      res.cookie("token",token,{expires:new Date(Date.now()+8*3600000)});
      res.send("Login successfully");
     }else{
      throw new Error("Password is not correct");
     }
   }catch(err){
    res.status(404).send("Error occured while login"+err);
   }

});
app.get("/profile",authUser,async(req,res)=>{
  try{ 
    const user=req.user;
    
   
    res.send(user);
  }catch(err){
    res.status(404).send("Error occured"+err);
  }
});
app.get("/sendConnectionRequest",authUser,async(req,res)=>{
  const user=req.user;
  console.log(user+"is sending the connection request");
  res.send("Connection request send");
})

connectMongoDb()
   .then(()=>{
    console.log("Connection established successfully");
    app.listen(3000,()=>{
        console.log("Server is listening");
       });
   })
   .catch((err)=>{
     console.log("Error occured"+err.message);
   });



