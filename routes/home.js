const express=require('express');
const router=express.Router();
router.get('/',(req,res)=>{
    
    res.render('home.ejs',{parameter:req.session.parameter});
})


module.exports=router;