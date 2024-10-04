const express=require("express");
const requestRouter=express.Router();
const User=require("../models/user");
const ConnectionRequest=require("../models/connection");
const authUser=require("../middleware/auth");
const USER_SAFE_DATA="firstname lastname ";
requestRouter.post("/request/send/:status/:toUserId",authUser,async(req,res)=>{
    try{
      const fromUserId=req.user._id;
      const toUserId=req.params.toUserId;
      const status=req.params.status;
      
        
      const allowedStatus=["ignored","interested"];
      if(!allowedStatus.includes(status)){
        return res.send("Invalid status "+status);
        
      }
      const toUser=await User.findById(toUserId);
      if(!toUser){
        return res.status(400).json({message:"User not exist"});
      }

      const existingConnection=await ConnectionRequest.findOne({
        $or:[
          {fromUserId,toUserId},
          {fromUserId:toUserId,toUserId:fromUserId}
        ],
      });
      if(existingConnection){
        return res.status(400).send({message:"Connection already exist"})
      }
      const connectionRequest=new ConnectionRequest({
        fromUserId,
        toUserId,
        status
      });
     
      
    
      const data=await connectionRequest.save();
      res.json({
        message:"Connection Request send successfully",
        data,
      })
    }
    catch(err){
        res.status(400).send("Error occured,something went wrong"+err);
    }
});

requestRouter.post("/request/review/:status/:requestId",authUser,async(req,res)=>{
     try{
        const loggedInUser=req.user;
        const {status,requestId}=req.params;
        const allowedStatus=["accepted","rejected"];
        if(!allowedStatus.includes(status)){
          return res.status(400).json({message:"Status is not valid"});
        }
        const connectionReview=await ConnectionRequest.findOne({
          _id:requestId,
          toUserId:loggedInUser._id,
          status:"interested",
        });
        if(!connectionReview){
         return res.status(400).json({message:"Connection request not found"})
        }
        connectionReview.status=status;
        const data=await connectionReview.save();
        res.json({message:"Connection requesr"+status,data});
     }catch(err){
      res.status(400).send("SOmething went wrong"+err);
     }
});



module.exports=requestRouter;