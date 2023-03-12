const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const flash = require('connect-flash');
const session=require('express-session')
const passport=require('passport')
const path = require('path');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const authenetication = require('./Controllers/authenticate')
const payment=require('./routes/payments')
const conmplaint  =require('./routes/Complaint')
const FacebookStrategy=require('passport-facebook')
const multer=require('multer')
const mongodb=require('mongodb')
const nodemailer=require('nodemailer')
const fs=require('fs')
const stripe = require('stripe')('sk_test_51MKLuRSH1eQbSerGuaEGwBn60WcsYK3lGV7arbxXQI0Ror6kFKDzuPzw53PpwrzffbyX3T5QE2OohKIfJBtaYdwg00MjwA42zq');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(flash())
app.use(bodyparser.json());
app.use(session({
  secret: 'MADHAVMADHAVMADHAV', // Use a secret key to sign the session ID cookie
  resave: false,
  saveUninitialized: true
}));
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log("error connecting to MongoDB:", err))
const port = process.env.PORT || 3000
app.set('view engine', 'ejs');
const signuproutes = require('./routes/signup');
app.use('/signup', signuproutes)
const loginroutes = require('./routes/login')
app.use('/login', loginroutes)
const homeroutes = require('./routes/home')
app.use('/', homeroutes);
const userprofile = require('./routes/userprofile')
app.use('/userprofile', userprofile);
const googlelogin=require('./routes/googlelogin')
app.use('/auth/google',googlelogin)
const payments=require('./routes/payments')
app.use('/payments',payments);
const complaint=require('./routes/Complaint')
app.use('/registercomplaint',complaint)
const usercomplaint=require('./routes/Usercomplaint');
app.use('/usercomplaint',usercomplaint);
app.use('/usercomplaints/',usercomplaint)
const update=require('./routes/update')
app.use('/update',update)

const facebooklogin=require('./routes/facebooklogin')
app.use('/auth/facebook',facebooklogin)
const logout=require('./routes/logout')
app.use('/logout',logout)
const admin=require('./routes/admin')
const userinformation=require('./routes/userfullinfo')
app.use('/userinfo',userinformation)
app.use('/admin',admin)
const forgetpassword=require('./routes/forgetpassword')
app.use('/forgetpassword',forgetpassword);
const resetpassword=require('./routes/resetpassword')
app.use('/resetpassword',resetpassword)
const standardcomplaint=require('./routes/admin_standard_complaints')
app.use('/standard_complaint',standardcomplaint)
const regular_complaint=require('./routes/regular_complaint')
app.use('/regular_complaint',regular_complaint)
const resolve_problems=require('./routes/resolve_problem')
app.use('/resolved_complain',resolve_problems)
app.listen(port, function () {
  console.log("server is runnong on the port 3000 ");
})