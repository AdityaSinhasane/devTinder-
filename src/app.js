const express = require('express');
const app = express();  // Here you are creating an instance of the express app. [OR] I am creating a new express.js application.
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json()); //This middleware converts JSON code into the javaScript objects.

app.post("/signup",async (req,res)=>{    
    // Creating a new instance of the User Model ::
    const user = new User(req.body);

    try{        
        await user.save();
        res.send("User Added Successfully!"); 
    }
    catch(err){
        res.status(400).send("Error saving the user:",err.message);
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

connectDB().then(()=>{
    console.log("Database is Connected Successfully....");
    app.listen(7777,()=>{
        console.log("Server is Successfully Listening On Port 7777....");
    });
}).catch(()=>{
    console.error("Database is Not Connected Successfully!!");
});

