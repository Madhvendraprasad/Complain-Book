const express=require('express')
const session=require('express-session')

const resetpasswordauth=async(req,res,next)=>{
    if(req.session.resetpassword){
        next();
    }
    else{
        res.redirect('/forgetpassword')
    }
}
module.exports=resetpasswordauth