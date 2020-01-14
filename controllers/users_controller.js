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
    // to do 
}

module.exports.createSession = (req, res)=>{
    // to do 
}