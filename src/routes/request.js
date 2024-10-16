const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth"); 

requestRouter.post("/sendConnectionRequest", userAuth ,async (req,res)=>{
    const user =  req.user;
    // Sending a Connection Request :: 
    console.log("Sending a Connection Request");
    res.send(user.firstName + " Sent Connection Request!");
}); 

module.exports = requestRouter;