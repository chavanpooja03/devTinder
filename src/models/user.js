const { JsonWebTokenError } = require("jsonwebtoken");
const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const UserModel=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minLength:4,
        unique:true,

    },
    lastname:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        validate(value){
         if(!validator.isEmail(value)){
            throw new Error("not valid email");
         }
        }

    },
    password:{
        type:String,
        validate(value){
            if(!validator.isStrongPassword(value)){
               throw new Error("Enter strong password");
            }
           }
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    age:{

        type:Number
    },
    photoUrl:{
      type:String,
      validate(value){
        if(!validator.isURL(value)){
           throw new Error("not valid Url");
        }
       }

    },
    skills:{
     type:[String],
    },   
    about:{
        type:String,
        default:"This is default about"
    }
}, {
    timestamps:true
}
);
UserModel.methods.getJWT=async function(){
  const user=this;
  const token=await jwt.sign({_id:user.id},"devTinder@123",{
    expiresIn:"7d",
  });
  return token;
}

UserModel.methods.validatePassword=async function(UserInputPassword){
  const user=this;
  const HashedPassword=user.password;
  const validated=await bcrypt.compare(UserInputPassword,HashedPassword);
  return validated;

}
module.exports=mongoose.model("User",UserModel);