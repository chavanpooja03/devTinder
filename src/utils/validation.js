const validator=require("validator");
const validateSignUp=(req)=>{
   const {firstname,lastname,password,gender,email,age}=req.body;
   if(!firstname|| !lastname){
    throw new Error("Enter valid name");
   }
   else if(!validator.isEmail(email)){
    throw new Error("Enter valid email");
   }else if(!validator.isStrongPassword(password)){
    throw new Error("Enter strong password");
   }

}

const validateUserEditData=(req)=>{
   const allowedEditData=["firstname","lastname","gender","age","email"];
   const isvalid=Object.keys(req.body).every(key=>allowedEditData.includes(key));
   return isvalid;
}
module.exports={validateSignUp,validateUserEditData};