const express = require('express');
const router = express.Router();
const Company = require('../models/company');
const jwt = require('jsonwebtoken');
var secret = 'tudasat-token';

module.exports = function (passport) {

    router.get('/getAllCompanyUsers', verifyToken, (req, res) => {
        jwt.verify(req.token, secret, function (err, userObj) {
            if (err) {
                return res.status(403);
            } else {
                Company.getAllCompanyUsers(function (err, companyList) {
                    if (err) throw err;
                    if (companyList) {
                        console.log(companyList)
                        return res.json({
                            message: '',
                            status:1,
                            result : companyList 
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