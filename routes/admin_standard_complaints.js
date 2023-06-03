const express=require('express')
const router=express.Router()
const Complaint=require('../Models/Complaintmodel')
const User=require('../Models/Users')
const mongoose=require('mongoose')
const flash=require('connect-flash');
const nodemailer=require('nodemailer')
const qr=require('qrcode');
const speakeasy=require('speakeasy')
const qri=require('qr-image')
const authentication=require('../Controllers/authenticate')
router.get('/',authentication,async(req,res)=>{
    if(req.user.isadmin=="yes"){
    const standardcomplaint=await Complaint.find({paid:'1',status:'0',assigned:'0'})
    res.render('standard_complaint.ejs',{standardcomplaint:standardcomplaint,check:req.flash('wrong email'),check2:req.flash('right email')});
    }
    else {
        res.redirect('/profile')
    }
    
})
router.post('/',async(req,res)=>{
    try {
        const data=await User.findOne({email:req.body.email})
        
        if(data){
            
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'madhavagrawal842@gmail.com',
                    pass: 'oovcykkthoilvadd'
                }
            });
            var mailOptions = {
                from: 'madhavagrawal842@gmail.com',
                to: req.body.registered_email,
                subject: 'Verification Link',
                text: `After your Complaint has been successfully visited by the technician verify it by visitng the website http://localhost:3000/resolved_complain/?email=${req.body.registered_email} .Your Complaint Number is ${req.body.problemid}  `,
                // attachments: [{
                //     filename: 'qr_code.jpg', // Change this to 'qr_code.png' or 'qr_code.svg' as per your requirement
                //     content: qrImageBuffer
                //   }]

            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                data.assigned="1";
                data.save();
            req.flash('right email','Email Sent Successfully')
            res.redirect('/standard_complaint')
            });
        }
        else{
            // console.log("wrong email");
            req.flash('wrong email','Email is not registered with us')
            res.redirect('/standard_complaint')
        } 
    } catch (error) {
        console.log(error)
    }
})
module.exports=router