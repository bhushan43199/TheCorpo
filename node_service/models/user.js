const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Company = require('../models/company');
const nodemailer = require('nodemailer');

// Super Admin = 0
// Admin = 1
// Vanue Provider = 2
// User = 3

const userSchema = mongoose.Schema({
    FIRST_NAME: { type: String, require: true },
    LAST_NAME: { type: String, require: true },
    ROLE: { type: Number, require: true },
    EMAIL: { type: String, require: true },
    PASSWORD: { type: String, require: true },
    GENDER: { type: String, require: true },
    ADDRESS: { type: String },
    PHONE: { type: Number, require: true },
    COMP_NAME: { type: String },
    PRICE: { type: Number, require: true },
    DOB: { type: Date },
    QUALIFICATION: { type: String },
    LOGO: { type: String },
    STATUS: { type: Boolean, require: true },
    CREATED_BY: { type: String, require: true },
    CREATED_DATE: { type: Date, require: true },
    UPDATE_BY: { type: String },
    UPDATE_DATE: { type: Date }
});


var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.PASSWORD, salt, function (err, hash) {
            newUser.PASSWORD = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getAllRegisterdUsers = function (userObj, callback) {
    var query = { 'ROLE': { $ne: 0 }, 'STATUS': true };
    // User.find(query, callback);
    User.
    find(query).
    sort({ CREATED_DATE: -1 }).
    exec(callback);
}

module.exports.getAllUsers = function (user, callback) {

    if (user.ROLE == 0) {
        var query = { 'ROLE': { $ne: 0 } };
        // User.find(query, callback);
        User.
        find(query).
        sort({ CREATED_DATE: -1 }).
        exec(callback);
    } else if (user.ROLE == 1) {
        var query = { 'ROLE': 1, 'STATUS': true }
        // User.find(query, callback);
        User.
        find(query).
        sort({ CREATED_DATE: -1 }).
        exec(callback);
    } else if (user.ROLE == 2) {
        var query = { 'ROLE': 2, 'STATUS': true }
        // User.find(query, callback);
        User.
        find(query).
        sort({ CREATED_DATE: -1 }).
        exec(callback);
    }
}

module.exports.getAllVanueProviders = function (callback) {
    var query = { 'ROLE': 2, 'STATUS': true };
    // User.find(query, callback);
    User.
        find(query).
        sort({ CREATED_DATE: -1 }).
        exec(callback);
}


module.exports.deleteUser = function (userId, callback) {
    var query = { STATUS: false };
    User.update({ _id: userId }, { $set: query }, callback);
}



module.exports.updateUserPassword = function (user, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            user.status = true;
            User.updateOne({ _id: user._id }, { $set: user }, callback);
        });
    })
}

module.exports.getUserByUsername = function (username, callback) {
    var query = { 'EMAIL': username, 'STATUS': true };
    User.findOne(query, callback);
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {

    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}

module.exports.changePassword = function (user, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.new_password, salt, function (err, hash) {
            user.password = hash;
            user.status = true;
            User.updateOne({ _id: user._id }, { $set: user }, callback);
        });
    })
}

module.exports.getUserByID = function (userId, callback) {
    User.findById(userId, callback);
}

module.exports.getProfileData = function (userId, callback) {
    Company.
        find({ "user_id": userId }).
        populate("user_id").
        exec(callback);
    // User.
    // findById(userId).
    // select("_id fname lname email phone userType status").
    // exec(callback);
}


module.exports.sendEmail = function (user, callback) {

    /* 
    * Email sending
    */
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'genesis71318@gmail.com',
            pass: '71318@genesis'
        }
    });
    var mailOptions = {
        from: 'no-reply@codedot.com',
        to: user.email,
        subject: 'Temporary Password',
        html: '<table align="center" border="1" cellpadding="0" cellspacing="0" width="600"><tr><td align="center" bgcolor="#2c2e3e" \
        style="padding: 10px 0 10px 0;"><h1 style="color:#fff">CodeDote</h1></td></tr><tr><td bgcolor="#ffffff"  \
        style="padding: 40px 30px 40px 30px;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>  \
        <td>Dear ' + user.fname + ' ' + user.lname + ',</td></tr><tr></tr><tr><td>we look forward to seeing you.</td></tr><tr><td><p>Thanks & regards,</p></td></tr><tr><td><p>CodeDote Team.</p></td></tr><tr><td style="padding: 30px 30px 30px 30px; text-align: center"> ' + user.password + '  </td></tr></table></td></tr><tr><td bgcolor="#1bb1dc" style="padding: 30px 30px 30px 30px;text-align: center; font-size: 20px; color:#fff"><table cellpadding="0" cellspacing="0" width="100%"><tr><td align="left">&copy;CodeDote</td><td align="right"><table border="0" cellpadding="0" cellspacing="0"><tr><td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td></tr></table></td></tr></table></td></tr></table>'
        //html: 'Greetings from Interviewer<br>Please follow below link to get into virtual interview room.<br><a href=' + weblink + '> Click Here</a><br>Please feel free to connect with me in case of any query.<br>All the Best!',
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Email not send');
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            callback(null, info);
        }
    });
}











// module.exports.getAllUsers = function (userObj, callback) {
//     if (userObj.user.userType == 0) {  //Super Admin
//         User

//             .where('status')
//             .exec( callback);
//     } else if (userObj.user.userType == 1) {   // Client
//         User
//             .where('status', true)
//             .where('userType',1)
//             // .where('companyId', userObj.user.companyId)
//             .exec(callback);
//     } else if (userObj.user.userType == 2  ) {   // Manager
//         User
//             .where('status', true)
//             .where('userType',2)
//             // .where('companyId', userObj.user.companyId)
//             .exec(callback);
//     }
// }


module.exports.userStatus = function (data, callback) {

    if (data.status == true && data.createdBy != undefined) {
        var query = { status: false };
        User.update({ 'createdBy': data.createdBy }, { $set: query }, callback);
    } else if (data.status == false && data.createdBy != undefined) {

        var query1 = { 'status': true };
        User.update({ 'createdBy': data.createdBy }, { $set: query1 }, callback);
    } else {

        if (data.status == false) {

            var query2 = { status: true };
            User.update({ _id: data._id }, { $set: query2 }, callback);
        } else {
            var query3 = { status: false };
            User.update({ _id: data._id }, { $set: query3 }, callback);

        }

    }


}




module.exports.updateUser = function (user, callback) {
    User.updateOne({ _id: user._id }, { $set: user }, callback);
}
module.exports.getLoggedInUser = function (query, callback) {
    query = { 'status': true };
    User.find(query, callback);
}

module.exports.updateuserimage = function (user, callback) {
    User.updateOne({ _id: user._id }, { $set: user }, callback);
}

module.exports.getFilteredUser = function (user, callback) {

    if (user.value == 2) {
        var query = { 'userType': user.value, 'status': true }
        User.find(query, callback)
    }
    if (user.value == 3) {
        var query = { 'userType': user.value, 'status': true }
        User.find(query, callback)
    }
    if (user.value == null) {
        var query = { 'status': true }
        User.find(query, callback)
    }
}


