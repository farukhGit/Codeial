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

// sign up and create a document for the user
module.exports.create = (req, res)=>{
    if(req.body.password != req.body.confirmPassword){
        console.log('Passwords entered do not match!');
        return res.redirect('back');
    }

    User.findOne({email : req.body.email}, (err, user)=>{
        if(err){
            console.log('Error in finding user.');
            return; 
        }

        if(!user){
            User.create(req.body, (err, user)=>{
                if(err){
                    console.log('Error in creating user while sign up.');
                    return;
                }

                return res.redirect('/users/signin');
            });
        }else{
            // if user exists, send back to the sign up page
            console.log('User with same email already exists');
            return res.redirect('back');
        }
    })
}

// sign in and create a session for the user
module.exports.createSession = (req, res)=>{
    // check if user exists
    User.findOne({email : req.body.email}, function(err, user){
        if(err){
            console.log('Error finding user.'); return;
        }

        // if user exists, confirm the password
        if(user){

            // password match, send to profile page
            if(user.password == req.body.password){
                res.cookie('user_id', user.id); 
                return res.redirect('/users/profile');
            }else{
                // password unconfirmed, show message and redirect to sign in page
                console.log('Incorrect password.');
                return res.redirect('back');
            }
        }else{
            console.log('User Not Found.');
            return res.redirect('back');
        }
    })
}