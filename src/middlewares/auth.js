
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req,res,next)=>{
   try{
        // Read the token from the request cookies
        const {token} = req.cookies;
        if(!token){
            throw new Error("Token is Not Valid!!!");
        }
        // validate the token
        const decodeObj = await jwt.verify(token,"DEV@Tinder$7009");
        // Find the user
        const { _id } = decodeObj;

        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not Found");
        }

        req.user = user;
        next(); 
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }   
};

module.exports = {
    userAuth,
};