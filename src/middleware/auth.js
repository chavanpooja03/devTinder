const jwt=require("jsonwebtoken");
const User=require("../models/user");
const authUser=async(req,res,next)=>{
    try{
    const {token}=req.cookies;
    if(!token){
        throw new Error("token is invalid");
    }
    const decodedMessage=await jwt.verify(token,"DEV@Tinder*");
    const {_id}=decodedMessage;
    const user=await User.findById(_id);
    if(!user){
        throw new Error("Invalid Credentials");
    }
    req.user=user;
    next();
  }catch(err){
    res.status(404).send("Something went wrong"+err);
  }

};
module.exports=authUser;