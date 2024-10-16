const express = require('express');
const authRouter = express.Router();
const { validateSignUpData } = require('../utils/validation');
const User = require("../models/user");
const bcrypt = require('bcrypt');
const validator = require('validator');

authRouter.post("/signup",async (req,res)=>{   
    try{ 
        // Validation of the data
        validateSignUpData(req);

        // Encrypt the password and then store into the database
        const {firstName, lastName, emailId, password} = req.body;
        const passwordHash = await bcrypt.hash(password,10);
        console.log(passwordHash);

        // Creating a new instance of the User Model ::
        const user = new User({
            firstName, lastName, emailId, password: passwordHash, 
        });

        await user.save();
        res.send("User Added Successfully!"); 
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
                       
});

// Login User 
authRouter.post("/login", async (req,res)=>{
    try{
        const {emailId, password} = req.body;
        if(!validator.isEmail(emailId)){
            throw new Error("Email is Not Valid!");
        }

        // Find user by email
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        
        // Compare the password with the stored hash
        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){
            // Create a JWT Token 
            const token = await user.getJWT();
            // Add the token to cookie and send the response back to user 
            res.cookie("token", token, { expires: new Date(Date.now() + 24 * 3600000)});
            res.send("Login Successful!!");
        }
        else{
            throw new Error("Invalid Credentials");.0
        }   
    }
    catch(err){
        res.status(400).send("Login Failed: "+err.message);
    }
});



module.exports = authRouter;