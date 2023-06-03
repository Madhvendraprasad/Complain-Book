const express=require('express')
const router=express.Router();
const complaint=require('../Models/Complaintmodel')
const mongoose=require('mongoose')
const qr=require('qrcode')
const nodemailer=require('nodemailer')
const flash=require('connect-flash')
let otp ='';

router.get('/',async(req,res)=>{
    
    
    // // string used to create 6 characters long OTP
    var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 

    
    // // Find the length of string 
    var len = string.length; 
    for (let i = 0; i < 6; i++ ) { 
        otp += string[Math.floor(Math.random() * len)]; 
    } 
    
    const qrImageBuffer = await qr.toBuffer(otp, {
        errorCorrectionLevel: 'M', 
        type: 'image/jpeg',
        quality: 0.3, 
        margin: 1, 
      });
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'complainbook24@gmail.com',
            pass: 'oovcykkthoilvadd'
        }
    });
    var mailOptions = {
        from: 'madhavagrawal842@gmail.com',
        to: req.query.email,
        subject: 'Verification Link',
        text: ` otp is attached in qr code  `,
        attachments: [{
            filename: 'qr_code.jpg', // Change this to 'qr_code.png' or 'qr_code.svg' as per your requirement
            content: qrImageBuffer
          }]

    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        
    });
    
    
    res.render('resolve_problems.ejs',{check1:req.flash('wrong_otp'),check2:req.flash('wrong_complaint_no')});
})
router.post('/',async(req,res)=>{
    const problemid=req.body.complaint_id;
    const otpi=req.body.otp;
   
   
    try {
        const data=await complaint.findById({_id:mongoose.Types.ObjectId(problemid)});
        if(data){
            
            if(otp===otpi) {
                

                
                req.flash('verified','code verified successfully')
                
                data.status="1";
                data.save();
                res.redirect('/success_page')
                
                
            }
            else {
                
                req.flash('wrong_otp','You have entered wrong otp')
                
            }
             
        }
        else{
            req.flash('wrong_complaint_no','you have entered wrong complaint number');
        }
    } catch (error) {
        console.log(error);
    }
    
    

})
module.exports=router