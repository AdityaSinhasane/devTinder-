const express = require('express');
const app = express();  // Here you are creating an instance of the express app. [OR] I am creating a new express.js application.
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const validator = require('validator');

app.use(express.json()); //This middleware converts JSON code into the javaScript objects.

app.post("/signup",async (req,res)=>{   
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
app.post("/login", async (req,res)=>{
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
        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(isPasswordValid){
            res.send("Login Successful!!");
        }
        else{
            throw new Error("Invalid Credentials");
        }   
    }
    catch(err){
        res.status(400).send("Login Failed: "+err.message);
    }
});

// Get user by email
app.get("/user",async (req,res)=>{
    const userEmail = req.body.emailId;
    try{
        const user = await User.findOne({emailId:userEmail});
        if(!user){
            res.status(404).send("User Not Found");
        }
        else{
            res.send(user);
        }
        
        // const users = await User.find({emailId: userEmail});
        // if(users.length === 0){
        //     res.status(404).send("User Not Found");
        // }
        // else{
        //     res.send(users);
        // }
    }
    catch(err){
        res.status(400).send("Something Went Wrong!!");
    }
});

// Feed API - GET /feed - get all users from the database
app.get("/feed",async (req,res)=>{
    try{    
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("Something Went Wrong!!");
    }
});

// Delete User from the database
app.delete("/user",async (req,res)=>{
    const userId = req.body.userId; 
    try{
        // const user = await User.findByIdAndDelete({_id:userId}});
        //[OR]
        const user = await User.findByIdAndDelete(userId);
        res.send("User Deleted Successfully"); 
    }
    catch(err){
        res.status(400).send("Something Went Wrong!!");
    }
});

// Update data of the user
app.patch("/user/:userId",async (req,res)=>{
    const userId = req.params?.userId;  
    const data = req.body;
    
    try{
        const ALLOWED_UPDATE = ["photoUrl","about","gender","age","skills"];

        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATE.includes(k));
        
        if(!isUpdateAllowed){
            throw new Error("Update Not Allowed");
        }

        if(data.skills.length > 15){
            throw new Error("Skills Can't be more than 10");
        }

        const user = await User.findByIdAndUpdate({_id:userId}, data, {returnDocument:"after", runValidators:true});
        console.log(user);
        res.send("User Updated Successfully");
    }
    catch(err){
        res.status(400).send("Update Failed: "+err.message);
    }
});

connectDB().then(()=>{
    console.log("Database is Connected Successfully....");
    app.listen(7777,()=>{
        console.log("Server is Successfully Listening On Port 7777....");
    });
}).catch(()=>{
    console.error("Database is Not Connected Successfully!!");
});

