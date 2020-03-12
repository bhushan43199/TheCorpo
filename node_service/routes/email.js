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