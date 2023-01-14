const express=require('express')
const router=express.Router()
const signupauth=require('../Controllers/signup')
const userfullinfo=require('../Models/userinfo')
const multer=require('multer')
const mongodb=require('mongodb')
const fs=require('fs')
const path=require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+file.originalname
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
const filter=function(req,file,cb){
   if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}
const upload = multer({ storage: storage,fileFilter:filter })
router.get('/',(req,res)=>{
    

    res.render('userinfo.ejs',{email:req.query.email,name:req.query.name})
})
router.post('/',upload.single('profileimage'),async(req,res)=>{
    // req.session.destroy();
    // res.clearCookie('connect.sid')
    
    try {
        
        // const uploadfile = multer().single('image');
        const userinfo=new userfullinfo({
            email:req.query.email,
            phonenumber:req.body.phnumber,
            adress:req.body.adress,
            occupation:req.body.occupation,
            image:req.file.filename
            // image:fs.readFileSync(path.join(__dirname+'../public/uploadimages'+req.file.filename))
        })
        userinfo.save(function(err){
          if(err){
            console.log(err)
          }
          else{
            res.redirect('/login')
          }
        })
        
        
    } catch (error) {
        console.log(error)
    }

})
module.exports=router