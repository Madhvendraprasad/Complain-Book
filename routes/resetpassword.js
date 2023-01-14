const express=require('express');
const router=express.Router();
const User=require('../Models/Users')
const resetauth=require('../Controllers/resetpassword')
const bcrypt=require('bcrypt')
const flash=require('connect-flash')
const session=require('express-session')
router.get('/',(req,res)=>{
    res.render('resetpassword.ejs');
})
router.post('/',async(req,res)=>{
    const password=await bcrypt.hash(req.body.password,10);
    User.findOneAndUpdate({email:req.query.email},{password:password,cnfpassword:password},(error,data)=>{
        
        req.flash('reset',"password reset sucessfully")
        res.redirect('/login');
    })
})


module.exports=router;