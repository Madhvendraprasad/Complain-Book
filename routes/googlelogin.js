
const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session=require('express-session')
const mongoose=require('mongoose')
const Users = require('../Models/Users');
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
router.use(passport.session())
router.use(passport.initialize())
router.use(session({
    secret: 'MADHAVMADHAVMADHAV', // Use a secret key to sign the session ID cookie
    resave: false,
    saveUninitialized: true
  }));
passport.use(new GoogleStrategy({
    clientID: "746367270042-hi71brjc0q3edsqf6rjk4lurefgil6on.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback",
    scope: ["profile", "email"],
    passReqToCallback: true
},
    async function (request,response, accessToken, refreshToken, profile, done) {

        
        Users.findOne({ email: profile._json.email },function(err,user){
            if(!user){
                const userdata=new Users({
                    fname:profile._json.given_name,
                    lname:profile._json.family_name,
                    email:profile._json.email,
                    password:profile._json.given_name+profile._json.family_name,
                    cnfpassword: profile._json.given_name+profile._json.family_name,
                })
                userdata.save(function(err){
                    if(err){
                        console.log(err);
                    }
                    
                })
            }
            
            done(err,user);
        })
        
        
    }
));
router.get('/',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));
router.get('/callback',
    passport.authenticate('google', {
        successRedirect:'/login',
        failureRedirect: '/login'
    }));
module.exports = router;