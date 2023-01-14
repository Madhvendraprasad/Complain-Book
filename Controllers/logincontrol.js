const express=require('express')
const session=require('express-session')
const flash=require('connect-flash')
const loginauth=async(req,res,next)=>{
    if(!req.session.parameter){
        next();
    }
    else{
        req.flash('alreadylogin',"You are login already")
        console.log("already login")
        res.redirect('/userprofile')
    }
}
module.exports=loginauth