const express=require("express");
const app=express();

app.get("/te+st/:testId/:password",(req,res)=>{
    console.log(req.params);
    res.send("Testing successfully completed");
});
app.use("/",(req,res)=>{
    res.send("Simple route called");
    })
app.listen(3000,()=>{
 console.log("Server is listening");
});