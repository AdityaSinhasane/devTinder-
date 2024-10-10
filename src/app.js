const express = require('express');
const app = express();  // Here you are creating an instance of the express app. [OR] I am creating a new express.js application.
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());

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

connectDB().then(()=>{
    console.log("Database is Connected Successfully....");
    app.listen(7777,()=>{
        console.log("Server is Successfully Listening On Port 7777....");
    });
}).catch(()=>{
    console.error("Database is Not Connected Successfully!!");
});

