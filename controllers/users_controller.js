const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = (req, res)=>{

    User.findById(req.params.id, function(err, user){
        return res.render('user', {
            title : "Codeial | User Profile",
            profile_user : user
        });
    })
}

module.exports.update = async (req, res)=>{
    if(req.user.id == req.params.id){
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('********** Multer Error    **********/n', err);    
                    return;
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    // saving the path of upload file into the avatar field of user
                    user.avatar = User.avatarPath + '/' + req.file.filename;        
                }
                user.save();
                return res.redirect('back');
            });
            // if(req.user.id == req.params.id){
            // User.findByIdAndUpdate(req.params.id, {username : req.body.name, email : req.body.email}, function(err, user){
            //     req.flash('success', 'Successfully Updated User Information.');
            //     return res.redirect('back');
            // });
        } catch (error) {
            console.log('error : ', error);
            return;
        }
    }else{
        req.flash('error', 'Unauthorized');
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
    try {
        req.flash('success', 'Log In Successful');
        return res.redirect('/');
    } catch (error) {
        console.log('Error : ', err);
        return;
    }
    
}

module.exports.destroySession = (req, res)=>{    
    req.logout();
    req.flash('success', 'You\'ve Logged Out');

    return res.redirect('/');
}