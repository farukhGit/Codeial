const nodemailer = require('../config/nodemailer');

exports.newComment = (comment)=>{
    console.log('inside new comment mailer.', comment);

    nodemailer.transporter.sendMail({
        from : 'dizzpozable57@gmail.com',
        to : comment.user.email,
        subject : 'new comment published',
        html : '<h1>Yup! Your comment is now published.</h1>'

    }, (err, info)=>{
        if(err){
            console.log('Error in sending mail', err); return;
        }

        console.log('Message sent. ', info);
        return;
    });
}