const express = require('express');
const app = express();  // Here you are creating an instance of the express app. [OR] I am creating a new express.js application.
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const validator = require('validator');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");


app.use(express.json()); // This middleware converts JSON code into the javaScript objects.
app.use(cookieParser()); // This middleware does, Whenever any request will come my cookie will be parsed and i can now access those cookies. 

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
            // Create a JWT Token 
            const token = await jwt.sign({_id: user._id},"DEV@Tinder$7009",{expiresIn:"7d"});    // jswt.sign() method used for Create a Token.
            

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

app.get("/profile", userAuth, async (req,res)=>{
    try{
        const user = req.user; 
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
});

app.post("/sendConnectionRequest", userAuth ,async (req,res)=>{
    const user =  req.user;
    // Sending a Connection Request :: 
    console.log("Sending a Connection Request");
    res.send(user.firstName + " Sent Connection Request!");
});

connectDB().then(()=>{
    console.log("Database is Connected Successfully....");
    app.listen(7777,()=>{
        console.log("Server is Successfully Listening On Port 7777....");
    });
}).catch(()=>{
    console.error("Database is Not Connected Successfully!!");
});

