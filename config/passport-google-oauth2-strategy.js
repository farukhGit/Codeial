const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

// passport uses googel-OAuth strategy
passport.use(new googleStrategy({
    clientID : '927546427652-c6u0gmf6spf633lj4cd5qs6q58s0p6eo.apps.googleusercontent.com',
    clientSecret :'er4CZwyVDW8aov63YDV8V6wY',
    callbackURL : "http://localhost:8002/users/auth/google/callback"
}, 
    function(accessToken, refreshToken, profile, cb){
        User.findOne({email : profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log('Error finding the google user. ', err); return;
            }
            
            console.log(profile);

            if(user){
                return cb(null, user);
            }else{
                User.create({
                    username : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex'),
                    avatar : profile.photos[0].value
                }, 
                    function(err, user){
                    if(err){
                        console.log('Error in creating a user. ', err); return;
                    } 

                    return cb(null, user);
                });
            }
        });
    }
));

module.exports = passport;







module.exports = passport;
