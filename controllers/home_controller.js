module.exports.homeActionOne = (req, res)=>{
    return res.render('home', {
        title : 'Codeial | Home'
    });
}