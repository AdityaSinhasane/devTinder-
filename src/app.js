const express = require('express');

const app = express();  // Here you are creating an instance of the express app. [OR] I am creating a new express.js application.

//This will only handle GET call to  /user.
app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params); //This is how you read the query parameters.
    res.send({firstName:"Aditya",lastName:"Sinhasane"});
}); 

app.listen(7777,()=>{
    console.log("Server is Successfully Listening On Port 7777....");
});
