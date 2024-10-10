const adminAuth = (req,res,next)=>{
    //Logic of Checking if the request is authorized  
    console.log("Admin Auth is getting Checked!!!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized Request");
    }
    else{
        next();
    }
};

const userAuth = (req,res,next)=>{
    //Logic of Checking if the request is authorized  
    console.log("user Auth is getting Checked!!!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized Request");
    }
    else{
        next();
    }
};

module.exports = {
    adminAuth,
    userAuth,
};