const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy;   
const ExtractJwt = require('passport-jwt').ExtractJwt;  

// we need User model to establish the identity
const User = require('../models/user'); 

let opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial',
    // do not need below two keys for now //
    // issuer : 'accounts.examplesoft.com',
    // audience : 'yoursite.net'
}

passport.use(new JwtStrategy(opts, function(jwt_payload, done){

        User.findById(jwt_payload._id, function(err, user){
            if(err){ console.log('Error in finding user from JWT. ', err); return; }

            if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }
        });
}));


module.exports = passport;