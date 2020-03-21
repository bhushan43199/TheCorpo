const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Vanue = require('../models/vanue');
const jwt = require('jsonwebtoken');
var fs = require('fs');
var secret = 'corporate-token';
var generator = require('generate-password');

var path = require('path');
var fs = require('fs');
var multer = require('multer');

// const DOCPATH = 'D:/Sahil/My Data/Genesis/CorporateConnection/uploads';
// const DBIMGPATH = 'D:/Sahil/My Data/Genesis/CorporateConnection/uploads';

const DOCPATH = 'E:/Genesis Solution/Corporate_Connection/corporate_connection_angular_admin/src/assets/uploads';
const DBIMGPATH = '/assets/uploads';



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

    router.post('/profilePic/:_id', verifyToken, (req, res) => {

        jwt.verify(req.token, secret, function (err, loggedInUser) {
            if (err) {
                // return res.status(403);
                return res.json({
                    message: err.message,
                    status: 0,
                    result: {}
                });
            } else {
                var userId = req.params._id;
                var mainPath = DOCPATH;
                var imgPath = '/' + userId;

                var imgFullPath = mainPath + imgPath;
                var filepath = '';
                console.log(imgFullPath)

                if (fs.existsSync(imgFullPath)) {

                    var final_path = imgFullPath;

                    var storage = multer.diskStorage({
                        destination: function (req, file, callback) {
                            callback(null, final_path)
                        },
                        filename: function (req, file, callback) {
                            filepath = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
                            callback(null, filepath);
                        }
                    });
                    var upload = multer({
                        storage: storage,
                        limits: { fileSize: 100000000 },
                        fileFilter: function (req, file, callback) {
                            var ext = path.extname(file.originalname)
                            if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
                                return callback(res.end('Only Images are allowed'), null)
                            }
                            return callback(null, true);
                        }
                    }).single('file');
                    upload(req, res, function (err) {
                        if (err) {
                            return res.json({
                                verify: 0,
                                message: err.message,
                                data: {}
                            });
                        }

                        User.findOne({ '_id': userId }, function (err, mypro) {
                            if (err) {
                                return res.json({
                                    verify: 0,
                                    message: err.message,
                                    data: {}
                                });
                            }

                            mypro.LOGO = DBIMGPATH + '/' + userId + '/' + filepath;
                            User.updateUser(mypro, function (err, updatecomp) {
                                if (err) throw err;
                                if (updatecomp) {
                                    return res.json({
                                        verify: 0,
                                        message: "Profile picture upload",
                                        data: mypro
                                    });
                                }
                            });
                        });
                    });
                } else {
                    var final_path = imgFullPath;
                    var storage = multer.diskStorage({
                        destination: function (req, file, callback) {
                            callback(null, final_path)
                        },
                        filename: function (req, file, callback) {
                            filepath = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
                            callback(null, filepath);
                        }
                    });

                    fs.mkdir(final_path, function (err) {
                        if (err) {
                            console.log('failed to create directory', err);
                        } else {

                            var upload = multer({
                                storage: storage,
                                limits: { fileSize: 100000000 },
                                fileFilter: function (req, file, callback) {
                                    var ext = path.extname(file.originalname)
                                    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
                                        return callback(res.end('Only Images are allowed'), null)
                                    }
                                    return callback(null, true);
                                }
                            }).single('file');

                            upload(req, res, function (err) {
                                if (err) return res.json({ err, status: 'error' });

                                User.findOne({ '_id': userId }, function (err, mypro) {
                                    if (err) {
                                        return res.json({
                                            verify: 0,
                                            message: err.message,
                                            data: {}
                                        });
                                    }

                                    mypro.LOGO = DBIMGPATH + '/' + userId + '/' + filepath;
                                    User.updateUser(mypro, function (err, updatecomp) {
                                        if (err) throw err;
                                        if (updatecomp) {
                                            return res.json({
                                                verify: 0,
                                                message: "Profile picture upload",
                                                data: mypro
                                            });
                                        }
                                    });
                                });
                            });
                        }
                    });
                }
            }
        });

    });

    router.post('/venueImagesUpload', verifyToken, (req, res) => {

        jwt.verify(req.token, secret, function (err, loggedInUser) {
            if (err) {
                // return res.status(403);
                return res.json({
                    message: err.message,
                    status: 0,
                    result: {}
                });
            } else {
                loggedInUser = loggedInUser.user;
                var userId = loggedInUser._id;
                var mainPath = DOCPATH;
                var imgPath = '/' + userId;

                var imgFullPath = mainPath + imgPath;
                var newFilename = '';
                console.log(imgFullPath);

                if (fs.existsSync(imgFullPath)) {
                    //File Upload
                    var final_path = imgFullPath + "/vanueImages";

                    var storage = multer.diskStorage({
                        destination: function (req, file, callback) {
                            callback(null, final_path)
                        },
                        filename: function (req, file, callback) {
                            newFilename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
                            callback(null, newFilename);
                        }
                    });
                    if (fs.existsSync(final_path)) {
                        // Do something
                        var upload = multer({
                            storage: storage,
                            limits: { fileSize: 100000000 },
                            fileFilter: function (req, file, callback) {
                                var ext = path.extname(file.originalname)
                                if (ext.toLowerCase() !== '.jpg' && ext.toLowerCase() !== '.jpeg' && ext.toLowerCase() !== '.png') {
                                    return callback(res.end('Only Images are allowed'), null)
                                }
                                return callback(null, true);
                            }
                        }).single('file');
                        upload(req, res, function (err) {
                            if (err) return res.json({ err, status: 'error' });

                            var vanue = new Vanue();
                            vanue.IMG_PATH = DBIMGPATH + imgPath + '/vanueImages/' + newFilename;
                            vanue.CREATED_BY = userId;
                            vanue.STATUS = true;
                            Vanue.create(vanue,
                                function (err, result1) {
                                    if (err) {
                                        //Database connection error
                                        return res.json({
                                            success: false,
                                            data: {
                                                verified: 0,
                                                status: err.message,
                                                info: []
                                            },
                                        });
                                    }

                                    if (result1 === undefined || result1 === null || result1.length == 0) {
                                        return res.json({
                                            success: true,
                                            data: {
                                                verified: 0,
                                                status: 'File upload failed.',
                                                info: {}
                                            },
                                        });
                                    }

                                    return res.json({
                                        success: true,
                                        data: {
                                            verified: 1,
                                            status: 'File upload success.',
                                            info: result1
                                        },
                                    });
                                });
                        });
                    } else {
                        fs.mkdir(final_path, function (err) {
                            if (err) {
                                console.log('failed to create directory', err);
                            } else {

                                var upload = multer({
                                    storage: storage,
                                    limits: { fileSize: 100000000 },
                                    fileFilter: function (req, file, callback) {
                                        var ext = path.extname(file.originalname)
                                        if (ext.toLowerCase() !== '.jpg' && ext.toLowerCase() !== '.jpeg' && ext.toLowerCase() !== '.png') {
                                            return callback(res.end('Only Images are allowed'), null)
                                        }
                                        return callback(null, true);
                                    }
                                }).single('file');

                                upload(req, res, function (err) {
                                    if (err) return res.json({ err, status: 'error' });

                                    var vanue = new Vanue();
                                    vanue.IMG_PATH = DBIMGPATH + imgPath + '/vanueImages/' + newFilename;
                                    vanue.CREATED_BY = userId;
                                    vanue.STATUS = true;
                                    Vanue.create(vanue,
                                        function (err, result1) {
                                            if (err) {
                                                //Database connection error
                                                return res.json({
                                                    success: false,
                                                    data: {
                                                        verified: 0,
                                                        status: err.message,
                                                        info: []
                                                    },
                                                });
                                            }

                                            if (result1 === undefined || result1 === null || result1.length == 0) {
                                                return res.json({
                                                    success: true,
                                                    data: {
                                                        verified: 0,
                                                        status: 'File upload failed.',
                                                        info: {}
                                                    },
                                                });
                                            }

                                            return res.json({
                                                success: true,
                                                data: {
                                                    verified: 1,
                                                    status: 'File upload success.',
                                                    info: result1
                                                },
                                            });
                                        });
                                });
                            }
                        });
                    }
                } else {
                    fs.mkdir(imgFullPath, function (err) {
                        if (err) {
                            console.log('failed to create directory', err);
                        }

                        var final_path = imgFullPath + "/vanueImages";;
                        var storage = multer.diskStorage({
                            destination: function (req, file, callback) {
                                callback(null, final_path)
                            },
                            filename: function (req, file, callback) {
                                newFilename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
                                callback(null, newFilename);
                            }
                        });
                        if (fs.existsSync(final_path)) {
                            // Do something
                            var upload = multer({
                                storage: storage,
                                limits: { fileSize: 100000000 },
                                fileFilter: function (req, file, callback) {
                                    var ext = path.extname(file.originalname)
                                    if (ext.toLowerCase() !== '.jpg' && ext.toLowerCase() !== '.jpeg' && ext.toLowerCase() !== '.png') {
                                        return callback(res.end('Only Images are allowed'), null)
                                    }
                                    return callback(null, true);
                                }
                            }).single('file');

                            upload(req, res, function (err) {
                                if (err) return res.json({ err, status: 'error' });

                                var vanue = new Vanue();
                                vanue.IMG_PATH = DBIMGPATH + imgPath + '/vanueImages/' + newFilename;
                                vanue.CREATED_BY = userId;
                                vanue.STATUS = true;
                                Vanue.create(vanue,
                                    function (err, result1) {
                                        if (err) {
                                            //Database connection error
                                            return res.json({
                                                success: false,
                                                data: {
                                                    verified: 0,
                                                    status: err.message,
                                                    info: []
                                                },
                                            });
                                        }

                                        if (result1 === undefined || result1 === null || result1.length == 0) {
                                            return res.json({
                                                success: true,
                                                data: {
                                                    verified: 0,
                                                    status: 'File upload failed.',
                                                    info: {}
                                                },
                                            });
                                        }

                                        return res.json({
                                            success: true,
                                            data: {
                                                verified: 1,
                                                status: 'File upload success.',
                                                info: result1
                                            },
                                        });
                                    });
                            });
                        } else {
                            fs.mkdir(final_path, function (err) {
                                if (err) {
                                    console.log('failed to create directory', err);
                                } else {

                                    var upload = multer({
                                        storage: storage,
                                        limits: { fileSize: 100000000 },
                                        fileFilter: function (req, file, callback) {
                                            var ext = path.extname(file.originalname)
                                            if (ext.toLowerCase() !== '.jpg' && ext.toLowerCase() !== '.jpeg' && ext.toLowerCase() !== '.png') {
                                                return callback(res.end('Only Images are allowed'), null)
                                            }
                                            return callback(null, true);
                                        }
                                    }).single('file');

                                    upload(req, res, function (err) {
                                        if (err) return res.json({ err, status: 'error' });
                                        var vanue = new Vanue();
                                        vanue.IMG_PATH = DBIMGPATH + imgPath + '/vanueImages/' + newFilename;
                                        vanue.CREATED_BY = userId;
                                        vanue.STATUS = true;
                                        Vanue.create(vanue,
                                            function (err, result1) {
                                                if (err) {
                                                    //Database connection error
                                                    return res.json({
                                                        success: false,
                                                        data: {
                                                            verified: 0,
                                                            status: err.message,
                                                            info: []
                                                        },
                                                    });
                                                }

                                                if (result1 === undefined || result1 === null || result1.length == 0) {
                                                    return res.json({
                                                        success: true,
                                                        data: {
                                                            verified: 0,
                                                            status: 'File upload failed.',
                                                            info: {}
                                                        },
                                                    });
                                                }

                                                return res.json({
                                                    success: true,
                                                    data: {
                                                        verified: 1,
                                                        status: 'File upload success.',
                                                        info: result1
                                                    },
                                                });
                                            });
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });

    });

    router.get('/getVanueImagesById/:_id', (req, res) => {
        var userId = req.params._id
        Vanue.getVanueImagesById(userId, function (err, list) {
            if (err) {
                return res.json({
                    verify: 0,
                    message: err.message,
                    data: {}
                });
            }
            if (list) {
                return res.json({
                    verify: 1,
                    message: "",
                    data: list
                });
            }
        });
    });

    router.post('/forgotPassword', (req, res) => {

        const userEmail = req.body.EMAIL;
        User.doesEmailExist(userEmail, function (err, isMatch) {
            if (err) {
                return res.json({
                    verify: 0,
                    message: err.message,
                    data: null
                });
            }
            if (isMatch) {
                var user = isMatch;
                console.log(user)
                var password = generator.generate({
                    length: 10,
                    numbers: true
                });
                user.PASSWORD = password;
                User.updateUserPassword(user, function (err, result) {
                    if (err) {
                        return res.json({
                            message: err.message,
                            status: 0,
                            result: {}
                        });
                    }
                    if (result) {
                        User.sendEmailForgotPassword(user, function (err, result) {
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
            } else {
                return res.json({
                    verify: 0,
                    message: 'Email not found.',
                    data: null
                });
            }
        });
    });

    router.post('/changePassword', verifyToken, (req, res) => {

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
                var user = loggedInUser.user;
                user.PASSWORD = data.PASSWORD;
                User.updateUserPassword(user, function (err, result) {
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
                            message: "Password update success.",
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