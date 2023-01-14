const express=require('express')
const router=express.Router()
const Complaint=require('../Models/Complaintmodel')
const User=require('../Models/Users')
const mongoose=require('mongoose')
const nodemailer=require('nodemailer')
const flash=require('connect-flash');
const session=require('express-session');
router.get('/',async(req,res)=>{
    const standardcomplaint=await Complaint.find({paid:'1',status:'0'})
    const regularcomplaint=await Complaint.find({paid:'0',status:'0'})
    
    res.render('adminpage.ejs',{regularcomplaint:regularcomplaint,standardcomplaint:standardcomplaint,check2:req.flash('wrong email')})
})
router.post('/',async(req,res)=>{
    try {
        const data=await User.findOne({email:req.body.email})
        if(data){
            
            await User.findOneAndUpdate({email:req.body.email},{$push:{complaints:{problem:req.body.problemid,status:'0'}}},(err,result)=>{
                if(err) console.log(err)
            })
            await Complaint.findByIdAndUpdate({_id:mongoose.Types.ObjectId(req.body.problemid)},{assigned:'1'},{new:true},(err,res)=>{
                if(err) console.log(err)
               
            })
        }
        else{
            req.flash('wrong email','Email is not registered with us')
            res.redirect('/admin')
        } 
    } catch (error) {
        console.log(error)
    }
    
})


module.exports=router