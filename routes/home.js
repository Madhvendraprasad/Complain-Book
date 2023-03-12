const express=require('express');
const router=express.Router();
const loginauth=require('../Controllers/logincontrol')
const session=require('express-session')
router.get('/',(req,res)=>{
    
    res.render('home.ejs',{parameter:req.cookies.jwtoken});
})


module.exports=router;