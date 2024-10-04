const express=require("express");
const bodyParser = require('body-parser');
const cookieParser=require("cookie-parser");
//const authUser=require("./middleware/auth.js")
const connectMongoDb=require("./config/database");

const app=express();
app.use(cookieParser());
app.use(bodyParser.json()); 
app.use(express.json());

const User = require("./models/user");
const authRouter = require("./routes/authentication");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter=require("./routes/user");





app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);




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



