const express = require('express');

const app = express();  // Here you are creating an instance of the express app. [OR] I am creating a new express.js application.

app.get("/",(req,res) =>{
    res.send("Namaste from the Dashboard!");
}); 

app.get("/hello",(req,res) =>{
    res.send("Hello hello hello hello!");
}); 

app.get("/test",(req,res) =>{
    res.send("Hello from the server!");
}); 


app.listen(7777,()=>{
    console.log("Server is Successfully Listening On Port 7777....");
});
