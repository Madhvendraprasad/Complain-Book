const express=require('express');
const router=express.Router();
const authenticate=require('../Controllers/authenticate')
const Complaint=require('../Models/Complaintmodel')
router.get('/',authenticate,(req,res)=>{
    console.log(req.query.id)
    const user=req.user;
    res.render('complaint.ejs',{para:req.query.id,user:user});
})
router.post('/',authenticate,async(req,res)=>{
    
    try {
        if(req.query.id){
            const usercomplaint=new Complaint({
                description:req.body.description,
                email:req.user.email,
                ptype:req.body.example,
                paid:'1',
            })
            if(req.body.example!='c1'){
                usercomplaint.save(function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.redirect('/userprofile')
                    }
                })
            }
            else{
                console.log("choose the type of problem")
            }
        }
        else{
            const usercomplaint=new Complaint({
                description:req.body.description,
                email:req.user.email,
                ptype:req.body.example,
                paid:'0',
            })
            if(req.body.example!='c1'){
                usercomplaint.save(function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.redirect('/userprofile')
                    }
                })
            }
            else{
                console.log("choose the type of problem")
            }
        }
        
        
        
    } catch (error) {
        console.log(error);
    }
})
module.exports=router;