const express=require('express');
const jwt=require('jsonwebtoken')
const router=express.Router();
const loginauth=require('../Controllers/logincontrol')
const session=require('express-session')
const Authenticate=require('../Controllers/authenticate')
router.get('/',(req,res)=>{
    
    res.render('home.ejs',{parameter:req.cookies.jwtoken});
})


module.exports=router;