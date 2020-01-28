const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async (req, res)=>{
    try {
        // find the user 
        let user = await User.findOne({email : req.body.email});
        if(!user || user.password != req.body.password){
            return res.json(422, {
                message : "Invalid Username or Password!"
            })
        }else{
            return res.json(200, {
                message : "Sign In Successful, Hers's your token : ",
                data : {
                    token : jwt.sign(user.toJSON(), 'codeial', {expiresIn : '100000'})
                }
            })
        }
    // gen JSON web token for user
    } catch (error) {
        console.log('Error : ', error);
        return;
    }
}