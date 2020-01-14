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
    // to do 
}

// sign in and create a session for the user
module.exports.createSession = (req, res)=>{
    // to do 
}