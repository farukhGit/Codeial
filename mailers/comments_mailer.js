const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment)=>{
    console.log('inside new comment mailer.', comment);
    let htmlString = nodeMailer.renderedTemplate({comment : comment}, '/comments/new_comment.ejs')

    nodeMailer.transporter.sendMail({
        from : 'dizzpozable57@gmail.com',
        to : comment.user.email,
        subject : 'new comment published',
        html : htmlString

    }, (err, info)=>{
        if(err){
            console.log('Error in sending mail', err); return;
        }

        console.log('Message sent. ', info);
        return;
    });
}