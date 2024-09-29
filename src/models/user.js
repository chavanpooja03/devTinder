const mongoose=require("mongoose");
const validator=require("validator");
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
module.exports=mongoose.model("User",UserModel);