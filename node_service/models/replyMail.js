const mongoose = require('mongoose');
var async = require("async");
var nodemailer = require("nodemailer");


const replyschema = mongoose.Schema({

    TO: { type: String, require: true },
    FROM: { type: String },
    SUBJECT: { type: String, require: true },
    MESSAGE: { type: String, require: true },
    ISREAD: { type: Boolean, require: true },
    ISACCEPT: { type: Boolean, require: true },
    ISSENT: { type: Boolean, require: true },
    ISRECEIVED: { type: Boolean},
    EMAIL_ID:{ type: String, ref: 'Email'},
    STATUS: { type: Boolean, require: true },
    CREATED_BY: { type: String, require: true },
    CREATED_DATE: { type: Date, require: true }
});

var ReplySchema = module.exports = mongoose.model('ReplyEmail', replyschema);

module.exports.replyEmail = function (contact, callback) {

    /* 
    * Email sending
    */
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'flemingparmar7895@gmail.com',
            pass: 'jesus7895#'
        }
    });
    var mailOptions = {
        from: contact.FROM,
        to: contact.TO,
        subject: contact.SUBJECT,
        html: '<table align="center" border="1" cellpadding="0" cellspacing="0" width="600"><tr><td align="center" bgcolor="#000" style="padding: 10px 0 10px 0;"><h1 style="color:#fff">Sports Master</h1></td></tr><tr><td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td>Hello,</td></tr><tr><td style="padding: 20px 0 30px 0; text-align: justify"><p>Email : '+ contact.EMAIL +'</p><p>Message : '+ contact.MESSAGE +'</p></td></tr><tr><td><p>Thanks & regards,</p></td></tr><tr><td><p>Sports Master Team.</p></td></tr></table></td></tr><tr><td bgcolor="#7cb5ec" style="padding: 30px 30px 30px 30px;text-align: center; font-size: 20px; color:#fff"><table cellpadding="0" cellspacing="0" width="100%"><tr><td align="left">&copy;Sports Master</td><td align="right"><table border="0" cellpadding="0" cellspacing="0"><tr><td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td></tr></table></td></tr></table></td></tr></table>',
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Email not send');
            console.log(error);
            callback(error, null);
        } else {
            console.log('Email sent: ' + info.response);
            var email = new ReplySchema(contact);
            email.STATUS = true;
            email.ISREAD = false;
            email.ISSENT = false;
            email.ISRECEIVED = true;
            email.ISACCEPT = false;
            email.CREATED_DATE = new Date();
            email.save(callback);
            // callback(null, info);
        }
    });
}


module.exports.getReplyEmailById = function (_id, callback) {
    var query = { 'EMAIL_ID': _id, 'STATUS': true };
    ReplySchema.
        findOne(query).
        exec(callback);
}
