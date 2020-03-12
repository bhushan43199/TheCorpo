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

    EMAIL: { type: String, require: true },
    SUBJECT: { type: String, require: true },
    MESSAGE: { type: String, require: true },
    ISREAD: { type: Boolean, require: true },
    STATUS: { type: Boolean, require: true },
    CREATED_BY: { type: String, require: true },
    CREATED_DATE: { type: Date, require: true }
});

var Email = module.exports = mongoose.model('Email', emailschema);


/* Loading modules done. */

function massMailer() {
    var self = this;
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'genesis71318@gmail.com',
            pass: '71318@genesis'
        }
    });
    // transporter = nodemailer.createTransport("SMTP",{
    //       host: 'smtp.gmail.com',
    //       port: 587,
    //       auth: {
    //         user: '',
    //         pass: ''
    //      },
    //       tls: {rejectUnauthorized: false},
    //       debug:true
    //     });

    // Fetch all the emails from database and push it in listofemails
    // Will do it later.
    self.invokeOperation();


};

/* Invoking email sending operation at once */

massMailer.prototype.invokeOperation = function () {
    var self = this;
    async.each(listofemails, self.SendEmail, function () {
        console.log(success_email);
        console.log(failure_email);
    });
}

/*
* This function will be called by multiple instance.
* Each instance will contain one email ID
* After successfull email operation, it will be pushed in failed or success array.
*/

massMailer.prototype.SendEmail = function (Email, callback) {
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
            callback();
        }
    ], function () {
        //When everything is done return back to caller.
        callback();
    });
}



module.exports.sendEmails = function (data, callback) {
    // User.update({ _id: userId }, { $set: query }, callback);
    listofemails = data.EMAIL;
    mailData = data;
    new massMailer();
}

// new massMailer(); //lets begin
