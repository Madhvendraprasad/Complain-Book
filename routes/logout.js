const express=require('express');
const router=express.Router();
const authenticate=require('../Controllers/authenticate')
router.get('/',authenticate,async(req,res)=>{
    req.user.tokens=[];//clear all the tokens of the database
    res.clearCookie('jwtoken');
    await req.user.save()
    res.redirect('/')
    
})
module.exports=router;