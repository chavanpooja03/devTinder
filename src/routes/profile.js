const express=require("express");
const profileRouter=express.Router();
const authUser=require("../middleware/auth.js");
const {validateUserEditData}=require("../utils/validation.js");
profileRouter.get("/profile",authUser,async(req,res)=>{
    try{ 
      const user=req.user;
      
     
      res.send(user);
    }catch(err){
      res.status(404).send("Error occured"+err);
    }
  });

profileRouter.patch("/profile/edit",authUser,async(req,res)=>{
      if(!validateUserEditData(req)){
        throw new Error("Invalid edit data");
      }
     
      const loggedInUser=req.user;
      console.log(loggedInUser);
      Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
      await loggedInUser.save();
      console.log(loggedInUser);

      res.send("USer edited successfully");
});
module.exports=profileRouter;