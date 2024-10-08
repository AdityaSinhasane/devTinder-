const express = require('express');

const app = express();  // Here you are creating an instance of the express app. [OR] I am creating a new express.js application.

const { adminAuth, userAuth } = require("./middlewares/auth");

// Handle Auth Middleware for all GET, POST, PATCH, DELETE,..... requests.
app.use("/admin",adminAuth);

app.post("/user/login",(req,res)=>{
    res.send("User Logged in Successfully!");
});

app.get("/user/data",userAuth,(req,res)=>{
    res.send("User data sent");
});

app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data Sent");
});

app.get("/admin/deleteUser",(req,res)=>{    
    res.send("Deleted a User");
});


app.listen(7777,()=>{
    console.log("Server is Successfully Listening On Port 7777....");
});
