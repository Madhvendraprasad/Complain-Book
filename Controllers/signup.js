const express=require('express')
const session=require('express-session')
const flash=require('connect-flash')
const loginauth=async(req,res,next)=>{
    if(req.session.signup){
        next();
    }
    else{
        res.redirect('/signup')
    }
}
module.exports=loginauth