const express=require('express');
const router=express.Router();
const loginauth=require('../Controllers/logincontrol')
const session=require('express-session')
router.get('/',(req,res)=>{
    console.log(req.session)
    res.render('home.ejs',{parameter:req.session.parameter});
})


module.exports=router;