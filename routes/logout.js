const express=require('express');
const router=express.Router();
const authenticate=require('../Controllers/authenticate')
router.get('/',authenticate,(req,res)=>{
    req.session.destroy();
    res.clearCookie('jwtoken');
    res.redirect('/')
})

module.exports=router;