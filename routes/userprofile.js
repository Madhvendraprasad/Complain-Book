const express=require('express');
const router=express.Router();
const authenticate=require('../Controllers/authenticate')
const session=require('express-session')
const flash=require('connect-flash')
const Users=require('../Models/Users')
const userinfo=require('../Models/userinfo')
router.get('/',authenticate,async(req,res)=>{
    try {
        const Userdata=await userinfo.findOne({email:req.user.email})
        const username=await Users.findOne({email:req.user.email})
        // console.log(Userdata);
        if(Userdata){
            res.render('profile.ejs',{Userdata:Userdata,username:username,logincheck:req.flash('loginalready')});
        }
        else{
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error)
    }
    
    
    
})

module.exports=router;