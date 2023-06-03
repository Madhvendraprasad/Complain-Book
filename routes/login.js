const express=require('express');
const router=express.Router();
const user=require('../Models/Users')
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken")
const session=require('express-session')
const flash=require('connect-flash')
const authenetication=require('../Controllers/authenticate')

router.use(session({
    secret: 'MADHAVMADHAVMADHAV',
    resave: false,
    saveUninitialized: false 
  }));
router.get('/',(req,res)=>{
   
    if(req.user){
        res.redirect('/userprofile')
    }
        
        res.render('login.ejs',{check:req.flash('error'),check2:req.flash('error1'),check3:req.flash('sucess'),check4:req.flash('reset')})
})

router.post('/',async(req,res) =>{
    
    try {
        
        const userdata=await user.findOne({email:req.body.email})
        if(userdata){
            const checkpassword=await bcrypt.compare(req.body.password,userdata.password);
            const token=await userdata.generateAuthToken();
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+86400000),
                httpOnly:true,
            })
            if(checkpassword){
               
                
                res.redirect('/')


            }
            else{
                req.flash('error1','Password is not correct')
                res.redirect('/login')
            }
        }
        else{
            req.flash('error','Email not registered')
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error);
    }
})


module.exports=router;