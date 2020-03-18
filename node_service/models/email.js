const mongoose = require('mongoose');
var async = require("async");
var nodemailer = require("nodemailer");
// This will store emails needed to send.
// We can fetch it from DB (MySQL,Mongo) and store here.
var listofemails = [];
// Will store email sent successfully.
var success_email = [];
// Will store email whose sending is failed.
var failure_email = [];

var mailData = null;

var transporter;


const emailschema = mongoose.Schema({

    TO: { type: String, require: true },
    FROM: { type: String },
    SUBJECT: { type: String, require: true },
    MESSAGE: { type: String, require: true },
    START_DATE: { type: Date, require: true },
    END_DATE: { type: Date, require: true },
    ISREAD: { type: Boolean, require: true },
    PLACE: { type: String, require: true },
    PRICE: { type: Number, require: true },
    ISACCEPT: { type: Boolean, require: true },
    ISSENT: { type: Boolean, require: true },
    ISRECEIVED: { type: Boolean},
    STATUS: { type: Boolean, require: true },
    CREATED_BY: { type: String, require: true },
    CREATED_DATE: { type: Date, require: true }
});

var EmailSchema = module.exports = mongoose.model('Email', emailschema);

/* Invoking email sending operation at once */
/*
* This function will be called by multiple instance.
* Each instance will contain one email ID
* After successfull email operation, it will be pushed in failed or success array.
*/

function SendEmail(Email, callback) {
    console.log("Sending email to " + Email);
    var self = this;
    self.status = false;
    // waterfall will go one after another
    // So first email will be sent
    // Callback will jump us to next function
    // in that we will update DB
    // Once done that instance is done.
    // Once every instance is done final callback will be called.
    async.waterfall([
        function (callback) {
            var mailOptions = {
                from: 'no-reply@corporate.com',
                to: Email,
                subject: 'Hi ! This is from Async Script',
                text: "Hello World !"
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                    failure_email.push(Email);
                } else {
                    self.status = true;
                    success_email.push(Email);

                }
                callback(null, self.status, Email);
            });
        },
        function (statusCode, Email, callback) {
            console.log("Will update DB here for " + Email + "With " + statusCode);
            var data = {
                TO: Email,
                FROM: mailData.FROM,
                SUBJECT: mailData.SUBJECT,
                MESSAGE: mailData.MESSAGE,
                START_DATE: mailData.START_DATE,
                END_DATE: mailData.END_DATE,
                PLACE: mailData.PLACE,
                PRICE:mailData.PRICE,
                STATUS: true,
                ISREAD: false,
                ISACCEPT: false,
                ISSENT:true,
                ISRECEIVED:false,
                CREATED_DATE: new Date()
            };
            var email = new EmailSchema(data);
            email.save(callback);
            // callback();
        }
    ], function () {
        //When everything is done return back to caller.
        callback();
    });
}

module.exports.sendEmails = function (data, callback) {
    // User.update({ _id: userId }, { $set: query }, callback);
    listofemails = data.TO;
    mailData = data;
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'flemingparmar7895@gmail.com',
            pass: 'jesus7895#'
        }
    });
    // Fetch all the emails from database and push it in listofemails
    // Will do it later.
    // invokeOperation(callback);
    async.each(listofemails, SendEmail, function () {
        // console.log(success_email);
        // console.log(failure_email);
        callback(null, true);
    });

}

module.exports.updateEmail = function (email, callback) {
    EmailSchema.updateOne({ _id: email._id }, { $set: email }, callback);
}

module.exports.getAllSentEmailByUser = function (user, callback) {

    var query = { 'FROM': user.EMAIL, 'STATUS': true };
    EmailSchema.
        find(query).
        sort({ CREATED_DATE: -1 }).
        exec(callback);
    // if (user.ROLE === 0) {
    //     var query = { 'FROM': user.EMAIL, 'STATUS': true };
    //     // EmailSchema.find(query, callback);
    //     EmailSchema.
    //         find(query).
    //         sort({ CREATED_DATE: -1 }).
    //         exec(callback);
    // } else {
    //     // console.log(user)
    //     var query = { 'FROM': user.EMAIL, 'STATUS': true };
    //     EmailSchema.
    //         find(query).
    //         sort({ CREATED_DATE: -1 }).
    //         exec(callback);
    //     // EmailSchema.find(query, callback);
    // }

}

module.exports.getAllInboxEmailByUser = function (user, callback) {
    var query = { 'TO': user.EMAIL, 'STATUS': true };
    EmailSchema.
        find(query).
        sort({ CREATED_DATE: -1 }).
        exec(callback);
}

module.exports.getUnReadEmails = function (user, callback) {
    var query = { 'TO': user.EMAIL, 'STATUS': true, 'ISREAD':false };
    EmailSchema.
        find(query).
        sort({ CREATED_DATE: -1 }).
        exec(callback);
}

module.exports.getEmailDataById = function (_id, callback) {
    var query = { 'STATUS': true, '_id': _id };
    EmailSchema.findOne(query).
        exec(callback);
}

// module.exports.replyEmail = function (contact, callback) {

//     /* 
//     * Email sending
//     */
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'flemingparmar7895@gmail.com',
//             pass: 'jesus7895#'
//         }
//     });
//     var mailOptions = {
//         from: contact.FROM,
//         to: contact.TO,
//         subject: contact.SUBJECT,
//         html: '<table align="center" border="1" cellpadding="0" cellspacing="0" width="600"><tr><td align="center" bgcolor="#000" style="padding: 10px 0 10px 0;"><h1 style="color:#fff">Sports Master</h1></td></tr><tr><td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td>Hello,</td></tr><tr><td style="padding: 20px 0 30px 0; text-align: justify"><p>Email : '+ contact.EMAIL +'</p><p>Message : '+ contact.MESSAGE +'</p></td></tr><tr><td><p>Thanks & regards,</p></td></tr><tr><td><p>Sports Master Team.</p></td></tr></table></td></tr><tr><td bgcolor="#7cb5ec" style="padding: 30px 30px 30px 30px;text-align: center; font-size: 20px; color:#fff"><table cellpadding="0" cellspacing="0" width="100%"><tr><td align="left">&copy;Sports Master</td><td align="right"><table border="0" cellpadding="0" cellspacing="0"><tr><td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td></tr></table></td></tr></table></td></tr></table>',
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log('Email not send');
//             console.log(error);
//             callback(error, null);
//         } else {
//             console.log('Email sent: ' + info.response);
//             var email = new EmailSchema(contact);
//             email.STATUS = true;
//             email.ISREAD = false;
//             email.ISSENT = false;
//             email.ISRECEIVED = true;
//             email.ISACCEPT = false;
//             email.save(callback);
//             // callback(null, info);
//         }
//     });
// }

