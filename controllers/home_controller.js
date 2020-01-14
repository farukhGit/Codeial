module.exports.homeActionOne = (req, res)=>{
    return res.render('home', {
        title : 'Home Page'
    });
}