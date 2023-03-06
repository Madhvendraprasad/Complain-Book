const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')
const Users = require('../Models/Users')
const flash=require('connect-flash')
const session=require('express-session')
const resetauth = require('../Controllers/resetpassword')
router.get('/', (req, res) => {
    res.render('forgetpassword.ejs',{check1:req.flash('noemail'),check2:req.flash('linksend')});
})
router.post('/', async (req, res) => {
    Users.findOne({ email: req.body.email }, function (data, err) {
        req.session.resetpassword=true;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'madhavagrawal842@gmail.com',
                pass: 'oovcykkthoilvadd'
            }
        });
        const link = `http://localhost:3000/resetpassword/?email=${req.body.email}`
        var mailOptions = {
            from: 'madhavagrawal842@gmail.com',
            to: req.body.email,
            subject: 'Complainbook forgot passowrd link',
            text: link
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
        });
        if (err) {
            
        req.flash("linksend","forget link send sucessfully")
        res.redirect('/forgetpassword')
        
        
        }
        else{
        req.flash("noemail"," email not registered ")
        res.redirect('/signup')
        }
        
        
    })

})

    module.exports = router;