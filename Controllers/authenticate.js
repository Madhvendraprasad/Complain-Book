const jwt=require('jsonwebtoken')
const Users=require('../Models/Users')
const Authenticate = async (req,res,next)=>{
    try {
        const token=req.cookies.jwtoken;
        const verify=jwt.verify(token,"MYNAMEISMADHAVMYNAMEISMADHAVMYNA")
        const rootuser=await Users.findOne({_id:verify._id,"tokens.token":token})
        
        if(!rootuser) {throw new Error("new error found") }
        // console.log("yes")
        req.token=token;
        req.user=rootuser;
        next();

    } catch (error) {
        res.redirect('/login');
    }
}


module.exports=Authenticate;
