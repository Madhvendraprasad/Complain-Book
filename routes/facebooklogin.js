const express=require('express')
const router=express.Router()
const passport=require('passport')
const FacebookStrategy=require('passport-facebook')
const Users = require('../Models/Users');
router.use(passport.session());
router.use(passport.initialize())
passport.use(new FacebookStrategy({
    clientID: "491174829698518",
    clientSecret: "3511600d3d8f694d7859f80f219dc257",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        
        Users.findOne({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));
router.get('/',
    passport.authenticate('facebook'));

router.get('/callback',
    passport.authenticate('facebook', { failureRedirect: '/login', successRedirect: '/login' }));
    module.exports=router