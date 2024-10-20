const express = require('express');
const userRouter  = express.Router();
const {userAuth} = require('../middlewares/auth');
const ConnectionRequest =  require('../models/connectionRequest');

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get all the pending Connection request for the loggedIn user.
userRouter.get("/user/requests/received", userAuth,  async(req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId",USER_SAFE_DATA);
    // }).populate("fromUserId",["firstName","lastName","photoUrl","age","gender","about","skills"]);

        

        res.json({message: "Data Fetched Successfully",data: connectionRequest});

    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
});

// This will give the connections or the matches suppose, if i sent request to elon and elon accepted now it will give me information about who is connected to me or who has accepeted my connections.
userRouter.get("/user/connections", userAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"},
            ]
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);


        console.log(connectionRequests);

        const data = connectionRequests.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId
        });

        res.json({data});
    }
    catch(err){
        res.status(400).send({message: err.message});
    }
});

module.exports = userRouter;

