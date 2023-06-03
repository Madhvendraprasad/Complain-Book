const express=require('express')
const router=express.Router()
const Complaint=require('../Models/Complaintmodel')
const User=require('../Models/Users')
const mongoose=require('mongoose')
const flash=require('connect-flash');
const authentication=require('../Controllers/authenticate')
router.get('/',authentication,async(req,res)=>{
    if(req.user.isadmin=="yes"){
    const regularcomplaint=await Complaint.find({paid:'0',status:'0'})
    res.render('regular_complaint.ejs',{regularcomplaint:regularcomplaint});
    }
    else{
        res.render('/profile')
    }
    

})
module.exports=router