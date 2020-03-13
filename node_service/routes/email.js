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

    router.get('/getAllEmailByUser', verifyToken, (req, res) => {
        jwt.verify(req.token, secret, function (err, userObj) {
            if (err) {
                return res.json({
                    verify: 0,
                    message: err.message,
                    data: {}
                });
            } else {
                var loggedIn = userObj.user;
                Email.getAllEmailByUser(loggedIn, function (err, usersList) {
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