const express = require('express');

const app = express();  // Here you are creating an instance of the express app. [OR] I am creating a new express.js application.


//app.use("/route",rH, [rH2, rH3], rH4, rH4);

app.use("/user",[(req,res,next)=>{
    // Route Handler 1
    console.log("Handling the route user 1!!!");
    next();
    },
    (req,res,next)=>{
    // Route Handler 2
    console.log("Handling the route user 2!!!");
    next();
    },
    (req,res,next)=>{
    // Route Handler 3
    console.log("Handling the route user 3!!!");
    next();
    },
    (req,res)=>{
    // Route Handler 4
    console.log("Handling the route user 4!!!");
    res.send("4th Response!!");
    }
]); 

app.listen(7777,()=>{
    console.log("Server is Successfully Listening On Port 7777....");
});
