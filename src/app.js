const express = require('express');

const app = express();  // Here you are creating an instance of the express app. [OR] I am creating a new express.js application.

//This will only handle GET call to  /user.
app.get("/user",(req,res)=>{
    res.send({firstName:"Aditya",lastName:"Sinhasane"});
});

app.post("/user",(req,res)=>{
    //Saving data to Database
    res.send("Data successfully saved to the database!");
});

app.delete("/user",(req,res)=>{
    res.send("Deleted Successfully!");
});

//This will match all the HTTP method API calls to  /test.
app.use("/test",(req,res) =>{
    res.send("Hello from the server!");
}); 

app.listen(7777,()=>{
    console.log("Server is Successfully Listening On Port 7777....");
});
