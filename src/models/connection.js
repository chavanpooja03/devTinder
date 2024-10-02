const mongoose=require("mongoose");
const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId
    },
    status:{
        type:String,
        enums:{
            values:["ignore","interested","accepted","rejected"],
            message:'{VALUE} is in incorrct status type'
        },
    },
},
{
 timestamps:true,
});
connectionRequestSchema.index({fromUserId:1,toUserId:1});
connectionRequestSchema.pre("save",function (next){
     const connectionRequest=this;
     if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself");

     }
     next();
});
const ConnectionRequestModel= new mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports=ConnectionRequestModel;