const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
var fs = require('fs');
var secret = 'corporate-token';
const Client = require('../models/client');
const Company = require('../models/company');
var generator = require('generate-password');


module.exports = function (passport) {


    //All Registerd users
    router.get('/getAllRegisterdUsers', verifyToken, (req, res) => {
        jwt.verify(req.token, secret, function (err, userObj) {
            if (err) {
                return res.json({
                    verify: 0,
                    message: err.message,
                    data: {}
                });
            } else {
                User.getAllRegisterdUsers(userObj, function (err, usersList) {
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

    // Users by role
    router.get('/getAllUsers', verifyToken, (req, res) => {
        jwt.verify(req.token, secret, function (err, userObj) {
            if (err) {
                return res.json({
                    verify: 0,
                    message: err.message,
                    data: {}
                });
            } else {
                var loggedIn = userObj.user;
                User.getAllUsers(loggedIn, function (err, usersList) {
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

    // All Vanue Providers 
    router.get('/getAllVanueProviders', (req, res) => {
        User.getAllVanueProviders(function (err, usersList) {
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
    });

    router.post('/updateUser', verifyToken, (req, res) => {

        jwt.verify(req.token, secret, function (err, loggedInUser) {
            if (err) {
                return res.json({
                    verify: 0,
                    message: err.message,
                    data: null
                });
            } else {
                var data = req.body;
                var userId = req.body._id;
                console.log(userId)
                User.findOne({ '_id': userId }, function (err, user) {
                    if (err) {
                        return res.json({
                            verify: 0,
                            message: err.message,
                            data: null
                        });
                    }
                    user.FIRST_NAME = data.FIRST_NAME;
                    user.LAST_NAME = data.LAST_NAME;
                    user.EMAIL = data.EMAIL;
                    user.ROLE = data.ROLE;
                    user.GENDER = data.GENDER;
                    user.ADDRESS = data.ADDRESS;
                    user.PHONE = data.PHONE;
                    user.COMP_NAME = data.COMP_NAME;
                    user.QUALIFICATION = data.QUALIFICATION;
                    User.updateUser(user, function (err, result) {
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
                                message: "User update success.",
                                data: user
                            });
                        }
                    });
                });
            }
        });
    });

    router.post('/delete', verifyToken, (req, res) => {

        jwt.verify(req.token, secret, function (err, user) {
            if (err) {
                // return res.status(403);
                return res.json({
                    verify: 0,
                    message: err.message,
                    data: null
                });
            } else {
                const userId = req.body._id;
                User.deleteUser(userId, function (err, user) {
                    if (err) {
                        return res.json({
                            verify: 0,
                            message: err.message,
                            data: null
                        });
                    }
                    if (user) {
                        return res.json({
                            verify: 1,
                            message: 'Deleted success..!',
                            data: null
                        });
                    }
                });
            }
        });
    });

    router.post('/updateProfile', verifyToken, (req, res) => {

        jwt.verify(req.token, secret, function (err, loggedInUser) {
            if (err) {
                // return res.status(403);
                return res.json({
                    message: err.message,
                    status: 0,
                    result: {}
                });
            } else {
                var data = req.body;
                var userId = req.body._id;
                User.findOne({ '_id': userId }, function (err, user) {
                    if (err) {
                        return res.json({
                            message: err.message,
                            status: 0,
                            result: {}
                        });
                    }

                    user.FIRST_NAME = data.FIRST_NAME;
                    user.LAST_NAME = data.LAST_NAME;
                    user.EMAIL = data.EMAIL;
                    user.DOB = data.DOB;
                    user.ADDRESS = data.ADDRESS;
                    user.PHONE = data.PHONE;
                    user.PRICE = data.PRICE;
                    User.updateUser(user, function (err, result) {
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
                                message: "Profile update success.",
                                data: user
                            });
                        }
                    });

                });
            }
        });
    });

    // Old -------------------------------------------------------


    router.get('/getProfile', verifyToken, function (req, res) {
        jwt.verify(req.token, secret, function (err, user) {
            if (err) {
                // return res.status(403);
                return res.json({
                    message: err.message,
                    status: 0,
                    result: {}
                });
            } else {
                User.getProfileData(user.userId, function (err, result) {
                    if (err) throw err;
                    if (result) {
                        return res.json({
                            message: "",
                            status: 1,
                            result: result
                        })
                    }
                });
            }
        });
    });

    router.post('/acceptRequest', verifyToken, (req, res) => {
        jwt.verify(req.token, secret, function (err, loggedInUser) {
            if (err) {
                return res.status(403);
            } else {
                var nUser = req.body;
                User.findById({ '_id': nUser._id }, function (err, user) {
                    if (err) {
                        return res.json({ message: err });
                    }

                    if (user) {
                        var password = generator.generate({
                            length: 6,
                            numbers: true
                        });

                        user.password = password;
                        console.log(password)
                        User.updateUserPassword(user, function (err, result) {
                            if (err) throw err;
                            if (result) {
                                user.password = password;
                                User.sendEmail(user, function (err, result) {
                                    if (err) throw err;
                                    if (result) {
                                        return res.json({
                                            message: "Request accept success",
                                            status: 1,
                                            result: result
                                        })
                                    }
                                });
                            }
                        });
                    }
                });


                // User.updateUser(nUser, function (err, result) {
                //     if (err) throw err;
                //     if (result) {
                //         return res.json({
                //             message: "Request accept success",
                //             status: 1,
                //             result: result
                //         })
                //     }
                // });
            }
        });
    });

    router.post('/activeInactiveUser', verifyToken, (req, res) => {
        jwt.verify(req.token, secret, function (err, user) {
            if (err) {
                return res.status(403);
            } else {
                var loggedInUser = user;
                if (req.body.status === true) {
                    req.body.status = false;
                } else {
                    req.body.status = true;
                }
                console.log(req.body);
                var nUser = req.body;
                User.updateUser(nUser, function (err, result) {
                    if (err) throw err;
                    if (result) {
                        return res.json({
                            message: "Update success",
                            status: 1,
                            result: result
                        })
                    }
                });
            }
        });
    });

    router.post('/changePassword', verifyToken, (req, res) => {
        jwt.verify(req.token, secret, function (err, loggedInUser) {
            if (err) {
                return res.status(403);
            } else {
                var reqData = req.body;
                User.findById(reqData._id, function (err, user) {
                    if (err) throw err;
                    if (user) {
                        User.comparePassword(reqData.old_password, user.password, function (err, isMatch) {
                            // console.log('comparePassword is calling..');
                            if (err) throw err;
                            if (isMatch) {
                                // return done(null, user);  
                                console.log(isMatch);
                                User.changePassword(reqData, function (err, result) {
                                    if (err) throw err;
                                    if (result) {
                                        return res.json({
                                            message: "Password update success.",
                                            status: 1,
                                            result: {}
                                        })
                                    }
                                });
                            } else {
                                return res.json({
                                    message: "Password is not match",
                                    status: 0,
                                    result: {}
                                })
                            }
                        })
                    }
                });
            }
        });
    });


    // ---------------------Old---------------------------------------
    router.get('/getUser', verifyToken, (req, res) => {
        jwt.verify(req.token, secret, function (err, authData) {
            if (err) {
                return res.status(403);
            } else {
                return res.json({
                    authData
                });
            }
        });
    });

    router.get('/getLoggedInUser', verifyToken, function (req, res) {
        jwt.verify(req.token, secret, function (err, user) {
            if (err) {
                return res.status(403);
            } else {
                return res.json({
                    user
                })
            }
        });
    });

    router.post('/userStatus', verifyToken, (req, res) => {
        jwt.verify(req.token, secret, function (err, userObj) {
            if (err) {
                return res.status(403);
            } else {
                var status = req.body;
                User.userStatus(status, function (err, usersList) {
                    if (err) throw err;
                    if (usersList) {

                        Client.userStatus(status, function (err, clientList) {
                            if (err) throw err;
                            if (clientList) {
                                return res.json(clientList);
                            }
                        });

                    }
                });
            }
        });
    });



    router.post('/updateUser', verifyToken, (req, res) => {

        jwt.verify(req.token, secret, function (err, user) {
            if (err) {
                return res.status(403);
            } else {
                var loggedInUser = user;
                const userId = req.body._id;
                const updateUser = req.body;
                updateUser.updatedBy = loggedInUser.user._id;
                updateUser.updatedDate = new Date();
                User.updateUser(userId, updateUser, function (err, user) {
                    if (err) throw err;
                    if (user) {
                        return res.json({
                            message: 'Update success..!',
                            user
                        });
                    }
                });
            }
        });
    });

    router.post('/createUser', verifyToken, (req, res) => {
        jwt.verify(req.token, secret, function (err, user) {
            if (err) {
                return res.status(403);
            } else {
                const createUser = new User({
                    fname: req.body.fname,
                    lname: req.body.lname,
                    title: req.body.title,
                    email: req.body.email,
                    username: req.body.username,
                    userID: req.body.userID,
                    address: req.body.address,
                    phone: req.body.phone,
                    password: req.body.password,
                    country: req.body.country,
                    city: req.body.city,
                    state: req.body.state,
                    companyname: req.body.companyname,
                    website: req.body.website,
                    zip: req.body.zip,
                    createdDate: new Date(),
                    userType: req.body.userType,
                    createdDateTime: new Date()
                });
                // createUser.userType = 1;
                createUser.status = true;
                createUser.createdBy = user.user._id;
                createUser.companyId = user.user.companyId;
                User.createUser(createUser, function (err, user) {

                    if (user) {
                        return res.json({
                            message: ' User created..',
                            user
                        });
                    }
                });
            }
        });
    });

    router.post('/getFilteredUser', verifyToken, function (req, res) {
        jwt.verify(req.token, secret, function (err) {
            if (err) {
                return res.status(403);
            } else {
                const user = req.body;
                User.getFilteredUser(user, function (err, usertype) {
                    if (err) return res.json({ err, status: 'error' });
                    if (usertype) {
                        return res.json(
                            usertype
                        );
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