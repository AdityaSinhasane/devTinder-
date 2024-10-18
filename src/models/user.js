const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt =  require('bcrypt');
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    lastName:{
        type:String, 
    },
    emailId:{
        type:String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address: "+value);
            }
        },
    },
    password:{
        type:String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password: "+value); 
            }
        },
    },
    age:{
        type:Number,
        min: 18,
    },
    gender:{
        type:String,
        enum: {
            values:["male","female","other"],
            message: `{VALUE} is Not a Valid Gender Type`
        }
        //[OR]
        // validate(value){
        //     if(!["male","female","others"].includes(value)){
        //         throw new Error("Gender Data is Not Valid");
        //     }   
        // }
    },
    photoUrl:{
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6vBz9VgjksAaZZkWOm8Lk3ZSb7gO25eP0-Q&s",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL: "+value);
            }
        },
    },
    about:{
        type:String,
        default: "This is a default about of the user!",
    },
    skills:{
        type:[String],
    }
},{timestamps: true,});


userSchema.methods.getJWT = async function(){
    const user = this;

    const token = await jwt.sign({_id: user._id},"DEV@Tinder$7009",{expiresIn:"7d"});    // jswt.sign() method used for Create a Token.
    return token;
};


userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;


};


module.exports = mongoose.model("User",userSchema); 