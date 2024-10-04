const express=require("express");
const authUser = require("../middleware/auth");
const ConnectionRequest=require("../models/connection");
const userRouter=express.Router();
const User=require("../models/user");
const USER_SAFE_DATA="firstname lastname age gender skills"
userRouter.get("/user/request/received",authUser,async(req,res)=>{
    try{
       const loggedInUser=req.user;
       const connectionRequest=await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        
       }).populate("fromUserId",["firstname","lastname"])
       res.json({
        connectionRequest
       })
    }catch(err){
        res.status(400).json({
            message:"Something went wrong"+err
        })
    }
});

userRouter.get("/user/connection",authUser,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connections=await ConnectionRequest.find({
          $or:[
           {toUserId:loggedInUser._id,status:"accepted"},
            {fromUserId:loggedInUser._id,status:"accepted"}
          ]
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);
        
       const data=connections.map((row)=>{
        if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
          return row.toUserId;
        }
        return row.fromUserId;
       });
       
        res.json({data:data});
  
    }catch(err){
     res.status(400).send("SOmething went wrong in connections"+err);
    }
  });

userRouter.get("/user/feed",authUser,async(req,res)=>{
    try{
         const page=(req.query.page) ||1;
         const limit=(req.query.limit)||10;
         const skip=(page-1)*limit;
         const loggedInUser=req.user;
         const connections=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
         }).select("fromUserId toUserId");
         const hiddenFromUsers=new Set();
         connections.forEach((req) => {
            hiddenFromUsers.add(req.fromUserId.toString());
            hiddenFromUsers.add(req.toUserId.toString());
         });
         console.log(hiddenFromUsers);
         const feed=await User.find({
            $and:[
                { _id:{ $nin:Array.from(hiddenFromUsers)}},
                {_id:{$ne: loggedInUser._id}},
            ]
         }).select(USER_SAFE_DATA).skip(skip).limit(limit);
         
         res.send(feed);
    }catch(err){
     res.status(400).send("Something went wrong in feed"+err);
    }
})
module.exports=userRouter;