const mongoose=require("mongoose");
const connectMongoDb=async()=>{
    await
mongoose.connect("mongodb+srv://pujachavan789:VxMJzDuFz10P3FeU@shreenode.i5wth.mongodb.net/devTiner")};
module.exports=connectMongoDb;
