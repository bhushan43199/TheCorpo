const express = require('express');
const router = express.Router();
const User = require('../models/user');
// const Company = require('../models/company');
const jwt = require('jsonwebtoken');
var secret = 'corporate-token';
// var multer = require('multer');
// var path = require('path');
// var fs = require('fs');
// const DOCPATH = 'D:/Sahil/My Data/Genesis/Admin/services-nodejs/uploads';
// const DBIMGPATH = 'assets/uploads';

module.exports = function (passport) {


    // Signup for normal user
    router.post('/signup', function (req, res) {

        var data = req.body;
        var newUser = new User(data);
        newUser.ROLE = 3;
        newUser.STATUS = true;
        newUser.CREATED_DATE = new Date();
        User.createUser(newUser, function (err, user) {
            if (err) {
                return res.json({
                    verify: 0,
                    message: err.message,
                    data: {}
                });
            }
            if (user) {
                return res.json({
                    verify: 1,
                    message: 'Registration successfully...!',
                    data: user
                });
            }
        });
    });

    // Registration for Admins
    router.post('/register', function (req, res) {

        var data = req.body;
        var newUser = new User(data);
        newUser.STATUS = true;
        newUser.CREATED_DATE = new Date();
        User.createUser(newUser, function (err, user) {
            if (err) {
                return res.json({
                    verify: 0,
                    message: err.message,
                    data: {}
                });
            }
            if (user) {
                return res.json({
                    verify: 1,
                    message: 'Registration successfully...!',
                    data: user
                });
            }
        });
    });

    router.post('/login', function (req, res, next) {

        passport.authenticate("local", function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.json({
                    verify: 0,
                    message: 'unauthorized',
                    data: {}
                });
            } else {
                var userId = user._id;
                jwt.sign({ userId }, secret, (err, token) => {
                    res.json({
                        token: token,
                        user: user
                    });
                });
            }
        })(req, res, next);

    });




    // File uplaod of Company documents.
    router.post('/uploadDoc/:companyId', (req, res, next) => {

        var companyId = req.params.companyId;
        var mainPath = DOCPATH;
        var imgPath = '/' + companyId;

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

                if (err) return res.json({ err, status: 'error' });

                Company.find({ '_id': companyId }, function (err, companyObj) {
                    if (err) return res.json({ err, status: 'error' });

                    console.log(companyObj);
                    console.log(filepath);
                    companyObj = companyObj[0];
                    companyObj.doc_id_proof = DBIMGPATH + '/' + filepath;
                    Company.updateCompany(companyObj, function (err, updatecomp) {
                        if (err) throw err;
                        if (updatecomp) {
                            return res.json({
                                message: 'File upload successfully...!',
                                updatecomp
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

                        Company.find({ '_id': companyId }, function (err, companyObj) {
                            if (err) return res.json({ err, status: 'error' });

                            console.log("create directory");
                            console.log(companyObj);
                            console.log(filepath);
                            companyObj = companyObj[0];
                            companyObj.doc_id_proof = DBIMGPATH + '/' + filepath;
                            Company.updateCompany(companyObj, function (err, updatecomp) {
                                if (err) throw err;
                                if (updatecomp) {
                                    return res.json({
                                        message: 'File upload successfully...!',
                                        updatecomp
                                    });
                                }
                            });
                        });
                    });
                }
            });
        }

    });

    return router;
};