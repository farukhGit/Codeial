const User = require('../models/user');

module.exports.profile = (req, res)=>{

    User.findById(req.params.id, function(err, user){
        return res.render('user', {
            title : "Codeial | User Profile",
            profile_user : user
        });
    })
}

module.exports.update = (req, res)=>{
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, {username : req.body.name, email : req.body.email}, function(err, user){
            return res.redirect('back');
        })
    }else{
        res.status(401).send('Unauthorized');
    }
}

module.exports.about = (req, res)=>{
        return res.render('about', {
            title : "Codeial | About",
        });
}

module.exports.signUp = (req, res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('signup', {
        title : 'Codeial | Sign Up'
    });
}

module.exports.signIn = (req, res) =>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

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
    req.flash('success', 'Log In Successful');
    return res.redirect('/');
}

module.exports.destroySession = (req, res)=>{    
    req.logout();
    req.flash('success', 'You\'ve Logged Out');

    return res.redirect('/');
}