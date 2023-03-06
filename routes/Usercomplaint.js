const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const authentication=require('../Controllers/authenticate')
const Complaintmodel =require('../Models/Complaintmodel')
const rating=require('../Models/Rating')
const bodyParser=require('body-parser')
const session=require('express-session')
const flash=require('connect-flash')
router.use(bodyParser.json())
const Rating=require('../Models/Rating')
router.get('/',authentication,async(req,res)=>{
    // res.render('usercomplaint.ejs');
    try {
        console.log(req.user.email)
        const Userdata=await Complaintmodel.find({email:req.user.email})
        
        if(Userdata){
            
            res.render('usercomplaint.ejs',{dataofUser:Userdata,checkdel:req.flash('delete'),checkup:req.flash('update'),checkrating:req.flash('rating'),checkoldrating:req.flash('oldrating')});
        }
        else{
            
            console.log("no complaints")
        }
    } catch (error) {
        console.log(err);
    }
    
    
})
router.delete('/:id',authentication,async(req,res)=>{
    const id=req.params.id;
    const objectId = mongoose.Types.ObjectId(id);
    
    Complaintmodel.findOneAndDelete({_id:objectId}, (err, doc) => {
        if (err) {
          console.log(err);
        } else {
            req.flash('delete',"complaint deleted sucessfully")
            res.redirect('/usercomplaint')
        }
      });
   
})
router.post('/',authentication,async(req,res)=>{
    
    
    const data=await Rating.findOne({complaintid:req.query.id.toString()})
    if(data){
        data.rating=req.body.rating.toString();
        req.flash("oldrating","rating already given")
        res.redirect('/usercomplaint')
    }
    else{
        const newrating = await Rating.create({complaintid:req.query.id.toString() , rating:req.body.rating.toString()});
        req.flash("rating","Rating added successfully")
        res.redirect('/usercomplaint')
    }
})

module.exports=router;