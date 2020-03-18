const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
var secret = 'corporate-token';
const Email = require('../models/email');


module.exports = function (passport) {

    router.post('/sendEmail', verifyToken, (req, res) => {

        jwt.verify(req.token, secret, function (err, loggedInUser) {
            if (err) {
                return res.json({
                    verify: 0,
                    message: err.message,
                    data: null
                });
            } else {
                var data = req.body;
                Email.sendEmails(data, function (err, result) {
                    if (err) {
                        return res.json({
                            message: err.message,
                            status: 0,
                            result: {}
                        });
                    }
                    if (result) {
                        return res.json({
                            verify: 1,
                            message: "Email send success.",
                            data: null
                        });
                    }
                });
            }
        });
    });

    router.post('/isRead', verifyToken, (req, res) => {

        jwt.verify(req.token, secret, function (err, loggedInUser) {
            if (err) {
                return res.json({
                    verify: 0,
                    message: err.message,
                    data: null
                });
            } else {
                var data = req.body;
                var emailId = req.body._id;
                Email.findOne({ '_id': emailId }, function (err, email) {
                    if (err) {
                        return res.json({
                            verify: 0,
                            message: err.message,
                            data: null
                        });
                    }
                    console.log(email)
                    email.ISREAD = true;
                    Email.updateEmail(email, function (err, result) {
                        if (err) {
                            return res.json({
                                message: err.message,
                                status: 0,
                                result: {}
                            });
                        }
                        if (result) {
                            return res.json({
                                verify: 1,
                                message: "Email update success.",
                                data: result
                            });
                        }
                    });
                });
            }
        });
    });

    router.get('/getAllSentEmailByUser', verifyToken, (req, res) => {
        jwt.verify(req.token, secret, function (err, userObj) {
            if (err) {
                return res.json({
                    verify: 0,
                    message: err.message,
                    data: {}
                });
            } else {
                var loggedIn = userObj.user;
                Email.getAllSentEmailByUser(loggedIn, function (err, usersList) {
                    if (err) {
                        return res.json({
                            verify: 0,
                            message: err.message,
                            data: {}
                        });
                    }
                    if (usersList) {
                        return res.json({
                            verify: 1,
                            message: "",
                            data: usersList
                        });
                    }
                });
            }
        });
    });

    router.get('/getAllInboxEmailByUser', verifyToken, (req, res) => {
        jwt.verify(req.token, secret, function (err, userObj) {
            if (err) {
                return res.json({
                    verify: 0,
                    message: err.message,
                    data: {}
                });
            } else {
                var loggedIn = userObj.user;
                Email.getAllInboxEmailByUser(loggedIn, function (err, usersList) {
                    if (err) {
                        return res.json({
                            verify: 0,
                            message: err.message,
                            data: {}
                        });
                    }
                    if (usersList) {
                        return res.json({
                            verify: 1,
                            message: "",
                            data: usersList
                        });
                    }
                });
            }
        });
    });

    router.get('/getEmailDataById/:_id', verifyToken, (req, res) => {
        jwt.verify(req.token, secret, function (err, userObj) {
            if (err) {
                return res.json({
                    verify: 0,
                    message: err.message,
                    data: {}
                });
            } else {
                var loggedIn = userObj.user;
                var _id = req.params._id;
                Email.getEmailDataById(_id, function (err, email) {
                    if (err) {
                        return res.json({
                            verify: 0,
                            message: err.message,
                            data: {}
                        });
                    }
                    if (email) {
                        return res.json({
                            verify: 1,
                            message: "Email Data",
                            data: email
                        });
                    }
                });
            }
        });
    });

    router.post('/isAccept', verifyToken, (req, res) => {

        jwt.verify(req.token, secret, function (err, loggedInUser) {
            if (err) {
                return res.json({
                    verify: 0,
                    message: err.message,
                    data: null
                });
            } else {
                var data = req.body;
                var emailId = req.body._id;
                Email.findOne({ '_id': emailId }, function (err, email) {
                    if (err) {
                        return res.json({
                            verify: 0,
                            message: err.message,
                            data: null
                        });
                    }
                    console.log(email)
                    email.ISACCEPT = true;
                    Email.updateEmail(email, function (err, result) {
                        if (err) {
                            return res.json({
                                message: err.message,
                                status: 0,
                                result: {}
                            });
                        }
                        if (result) {
                            return res.json({
                                verify: 1,
                                message: "Email update success.",
                                data: result
                            });
                        }
                    });
                });
            }
        });
    });

    router.post('/replyEmail', verifyToken, (req, res) => {

        jwt.verify(req.token, secret, function (err, loggedInUser) {
            if (err) {
                return res.json({
                    verify: 0,
                    message: err.message,
                    data: null
                });
            } else {
                var data = req.body;
                Email.replyEmail(data, function (err, result) {
                    if (err) {
                        return res.json({
                            message: err.message,
                            status: 0,
                            result: {}
                        });
                    }
                    if (result) {
                        return res.json({
                            verify: 1,
                            message: "Email send success.",
                            data: null
                        });
                    }
                });
            }
        });
    });

    



    //Verify Token
    function verifyToken(req, res, next) {

        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } else {
            //Forbidden
            res.status(403);
        }
    }

    return router;
};