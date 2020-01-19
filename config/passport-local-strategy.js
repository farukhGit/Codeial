const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField : 'email',
    passReqToCallback : true
}, function(req, email, password, done){
    User.findOne({email : email}, function(err, user){
        if(err){
            req.flash('error', err);
            return done(err);
        }
        if(!user || user.password != password){
            req.flash('error', 'Invalid Username / Password');
            return done(null, false);
        }

        return done(null, user);
    });
}));


passport.serializeUser((user, done)=>{
    done(null, user.id);
});


passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        if(err){
            console.log('Error in finding user ---> passport');
            return done(err);
        }

        return done(null, user);
    });
});

passport.checkAuthentication = (req, res, next)=>{
    // if user is signed in , pass the req to the next function     
    if(req.isAuthenticated())
        return next();
    
    
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = (req, res, next)=>{
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we're sending it to the locals for the views
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;