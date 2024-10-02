const express=require("express");
const requestRouter=express.Router();
const User=require("../models/user");
const ConnectionRequest=require("../models/connection");
const authUser=require("../middleware/auth");

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

module.exports=requestRouter;