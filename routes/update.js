const express=require('express');
const { default: mongoose } = require('mongoose');
const router=express.Router();
const authentication=require('../Controllers/authenticate')
const Complaintmodel=require('../Models/Complaintmodel')
const session=require('express-session')
const flash=require('connect-flash')
router.get('/:id',authentication,async(req,res)=>{
    
    const id=mongoose.Types.ObjectId(req.params.id);
    const userdata=await Complaintmodel.findOne({_id:id});
    
    res.render('update.ejs',{Userdata:userdata});
})
router.post('/:id',authentication,async(req,res)=>{
    const id=mongoose.Types.ObjectId(req.params.id);
    const data=await Complaintmodel.findByIdAndUpdate({_id:id},{description:req.body.description,ptype:req.body.name},{new:true})
    req.flash("update","Problem updated successfully")
    res.redirect('/usercomplaint')
})


module.exports=router;