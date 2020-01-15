const User = require('../models/user');

module.exports.profile = (req, res)=>{
    return res.render('user', {
        title : 'User Profile'
    });
}

module.exports.signUp = (req, res)=>{
    return res.render('signup', {
        title : 'Codeial | Sign Up'
    });
}

module.exports.signIn = (req, res) =>{
    return res.render('signin', {
        title : "Codeial | Sign In"
    });
}

module.exports.create = (req, res)=>{
    // compare password and confirm password
    if(req.body.password != req.body.confirmPassword){
        console.log('Passwords do not match.');
        return res.redirect('back');
    }

    // check email in database - see if already exists
    User.findOne({email : req.body.email}, (err, user)=>{
        if(err){
            console.log('Error finding the user');
            return res.redirect('back');
        }
        if(!user){
            User.create(req.body, (err, user)=>{
                if(err){
                    console.log('Error creating a user.');
                    return;
                }
                console.log('Success creating a new user.');
                return res.redirect('/users/sign-in');
            });
        }else{
            console.log('Email address already exists.');
            return res.redirect('back');
        }
    });
}

module.exports.createSession = (req, res)=>{
    return res.redirect('/');
}