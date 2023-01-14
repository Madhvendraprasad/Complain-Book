const express=require('express');
const router=express.Router();
const Users=require('../Models/Users');
const bcrypt=require('bcrypt');
const flash=require('flash');
const session=require('express-session')
router.get('/',(req,res)=>{

    res.render('signup.ejs',{errormessage:req.flash('signuperror')});
})
router.post('/',async (req,res)=>{
    try {
        const data=await Users.findOne({email:req.body.email})
        if(data){
            req.flash('signuperror','User already registered')
            res.redirect('/signup')
        }
        else{
            const userdata=new Users({
                fname:req.body.fname,
                lname:req.body.lname,
                email:req.body.email,
                password:req.body.password,
                cnfpassword: req.body.cnfpassword
            })
            if(req.body.password===req.body.cnfpassword){
                userdata.save(function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        req.flash('sucess','successfully registered')
                        req.session.signup=true;
                        res.redirect(`/userinfo/?email=${req.body.email}&name=${req.body.fname}`);
                    }
                })
            }
        }
        
       
        
        
        
    } catch (e) {
        console.log(e);
        res.send(e)
    }
})


module.exports=router;