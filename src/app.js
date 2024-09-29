const express=require("express");
const app=express();


app.get("/user",
    (req,res,next)=>{
        console.log("Route 1 called");
        res.send("HII");
        next();
    },
    (req,res,next)=>{
        console.log("Route 2 called");
        next();
    },
    (req,res,next)=>{
        console.log("ROute 3 called");
        res.send("ROute 3!");
    }
)
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