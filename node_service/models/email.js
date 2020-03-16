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

    // EMAIL: { type: String, require: true },
    TO: { type: String, require: true },
    FROM: { type: String },
    SUBJECT: { type: String, require: true },
    MESSAGE: { type: String, require: true },
    ISREAD: { type: Boolean, require: true },
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
                STATUS: true,
                ISREAD: false,
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
            user: 'genesis71318@gmail.com',
            pass: '71318@genesis'
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

module.exports.getAllEmailByUser = function (user, callback) {

    if(user.ROLE === 0){
         var query = { 'STATUS':true };
        // EmailSchema.find(query, callback);
        EmailSchema.
        find(query).
        sort({ CREATED_DATE: -1 }).
        exec(callback);
    }else {
        // console.log(user)
        var query = { 'FROM': user.EMAIL, 'STATUS':true };
        EmailSchema.
        find(query).
        sort({ CREATED_DATE: -1 }).
        exec(callback);
        // EmailSchema.find(query, callback);
    }
    
}

module.exports.getEmailDataById = function (_id, callback) {

         var query = { 'STATUS':true, '_id':_id };
        // EmailSchema.find(query, callback);
        EmailSchema.
        find(query).
        exec(callback);
    
}


