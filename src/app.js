const express = require('express');

const app = express();  // Here you are creating an instance of the express app. [OR] I am creating a new express.js application.

app.get("/getUserData",(req,res)=>{
   try{
    //Logic of database call and get user data
    throw new Error("asjfgeiorhf");  
    res.send("User data sent");
   }
   catch(err){
    res.status(500).send("Some Error Occured Contact support team");
   }
});

app.use("/",(err,req,res,next)=>{
    if(err){
        // log your error
        res.status(500).send("Something went wrong");
    }
});

app.listen(7777,()=>{
    console.log("Server is Successfully Listening On Port 7777....");
});
