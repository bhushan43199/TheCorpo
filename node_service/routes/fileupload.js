const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var dicom = require('dicom-parser');
var secret = 'super secret';
const Fileupload = require('../models/fileupload');
// const DOCPATH = 'D:/Sahil/Project/taralux/src/assets/uploads';
// const DBIMGPATH = 'assets/uploads';

const DOCPATH = '/var/www/taralux/assets/uploads'
const DBIMGPATH = '/assets/uploads';

var upload = multer({ dest: 'uploads/' });
module.exports = function (passport) {


	router.post('/addFile', (req, res) => {
		var token = req.headers.authorization
		jwt.verify(token, secret, function (err, loggedInUser) {
			if (err) {
				return res.status(403);
			} else {
				// var num = Math.floor(Math.random() * 90000) + 10000;
				// var da = "series-" + num;
				// var mainPath = DOCPATH;
				// var imgPath = loggedInUser.user._id + '/' + da;
				// var imgFullPath = mainPath + imgPath;

				var mainPath = DOCPATH;
				// var imgPath = '/subservice/';
				var dicomFileAsBuffer;
				var dataSet;
				var imgPath = '/' + loggedInUser.user._id + '/';

				var imgFullPath = mainPath + imgPath;
				var filepath = '';
				// var subserviceId = req.params._ID;
				var logInUser = loggedInUser.user;


				if (fs.existsSync(imgFullPath)) {
					//File Upload
					// var user_id = logInUser._id;
					// var final_path = imgFullPath + user_id;
					var final_path = imgFullPath + 'Series';

					var storage = multer.diskStorage({
						destination: function (req, file, callback) {
							callback(null, final_path)
						},
						filename: function (req, file, callback) {
							filepath = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
							callback(null, filepath);
						}
					});
					if (fs.existsSync(final_path)) {
						// Do something
						var upload = multer({
							storage: storage,
							limits: { fileSize: 100000000 },
							fileFilter: function (req, file, callback) {
								var ext = path.extname(file.originalname)
								// if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
								// 	return callback(res.end('Only Images are allowed'), null)
								// }
								return callback(null, true);
							}
						}).single('file');
						upload(req, res, function (err) {
							5
							if (err) return res.json({ err, status: 'error' });

							var fileupload = new Fileupload({
								filepath: final_path + '/' + filepath,
								status: true,
								createdDateTime: new Date()
							});
							dicomFileAsBuffer = fs.readFileSync(fileupload.filepath);
							dataSet = dicom.parseDicom(dicomFileAsBuffer);

							/*Dicom Read Image Data */
							var name = (dataSet.string('x00100010'));
							var patID = parseInt((dataSet.string('x00100020')));
							var age = (dataSet.string('x00101010'));
							var modality = (dataSet.string('x00080060'));
							var gen = (dataSet.string('x00100040'));
							var accss = (dataSet.string('x00080050'));
							var desc = (dataSet.string('x0008103e'));
							var bDate = (dataSet.string('x00100030'));

							fileupload.createdBy = loggedInUser.user._id;
							fileupload.name = name;
							fileupload.patientID = patID;
							fileupload.patientAge = age;
							fileupload.modality = modality;
							fileupload.patientSex = gen;
							fileupload.accession = accss;
							fileupload.description = desc;
							fileupload.bdate = bDate;
							fileupload.filepath = DBIMGPATH + imgPath + 'Series' + '/' + filepath;

							Fileupload.addFileInfo(fileupload, function (err, file) {
								if (err) return res.json({ err, status: 'error' });
								if (file) {
									return res.json({
										status: 200,
										message: 'File addedd successfully'
									});
								}
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
										// if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
										// 	return callback(res.end('Only Images are allowed'), null)
										// }
										return callback(null, true);
									}
								}).single('file');

								upload(req, res, function (err) {
									if (err) return res.json({ err, status: 'error' });

									var fileupload = new Fileupload({
										filepath: final_path + '/' + filepath,
										status: true,
										createdDateTime: new Date()
									});
									dicomFileAsBuffer = fs.readFileSync(fileupload.filepath);
									dataSet = dicom.parseDicom(dicomFileAsBuffer);

									/*Dicom Read Image Data */
									var name = (dataSet.string('x00100010'));
									var patID = (dataSet.string('x00100020'));
									var age = (dataSet.string('x00101010'));
									var modality = (dataSet.string('x00080060'));
									var gen = (dataSet.string('x00100040'));
									var accss = (dataSet.string('x00080050'));
									var desc = (dataSet.string('x0008103e'));
									var bDate = (dataSet.string('x00100030'));


									Fileupload.find({ 'patientID': patID }, function (err, fileupload) {
										if (err) {
											return res.json({ message: err });
										}
										if (fileupload) {

											fileupload.createdBy = loggedInUser.user._id;
											fileupload.name = name;
											fileupload.patientID = patID;
											fileupload.patientAge = age;
											fileupload.modality = modality;
											fileupload.patientSex = gen;
											fileupload.accession = accss;
											fileupload.description = desc;
											fileupload.bdate = bDate;
											fileupload.filepath = DBIMGPATH + imgPath + 'Series' + '/' + filepath;

											Fileupload.addFileInfo(fileupload, function (err, file) {
												if (err) return res.json({ err, status: 'error' });
												if (file) {
													return res.json({
														status: 200,
														message: 'File addedd successfully'
													});
												}
											});

										}
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

						var final_path = imgFullPath + 'Series';
						var storage = multer.diskStorage({
							destination: function (req, file, callback) {
								callback(null, final_path)
							},
							filename: function (req, file, callback) {
								filepath = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
								callback(null, filepath);
							}
						});
						if (fs.existsSync(final_path)) {
							// Do something
							var upload = multer({
								storage: storage,
								limits: { fileSize: 100000000 },
								fileFilter: function (req, file, callback) {
									var ext = path.extname(file.originalname)
									// if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
									// 	return callback(res.end('Only Images are allowed'), null)
									// }
									return callback(null, true);
								}
							}).single('file');

							upload(req, res, function (err) {
								if (err) return res.json({ err, status: 'error' });

								var fileupload = new Fileupload({
									filepath: final_path + '/' + filepath,
									status: true,
									createdDateTime: new Date()
								});
								dicomFileAsBuffer = fs.readFileSync(fileupload.filepath);
								dataSet = dicom.parseDicom(dicomFileAsBuffer);

								/*Dicom Read Image Data */
								var name = (dataSet.string('x00100010'));
								var patID = (dataSet.string('x00100020'));
								var age = (dataSet.string('x00101010'));
								var modality = (dataSet.string('x00080060'));
								var gen = (dataSet.string('x00100040'));
								var accss = (dataSet.string('x00080050'));
								var desc = (dataSet.string('x0008103e'));
								var bDate = (dataSet.string('x00100030'));





								Fileupload.findOne({ 'patientID': patID }, function (err, fileupload) {
									if (err) {
										return res.json({ message: err });
									}
									if (fileupload) {

										fileupload.createdBy = loggedInUser.user._id;
										fileupload.name = name;
										fileupload.patientID = patID;
										fileupload.patientAge = age;
										fileupload.modality = modality;
										fileupload.patientSex = gen;
										fileupload.accession = accss;
										fileupload.description = desc;
										fileupload.bdate = bDate;
										fileupload.filepath = DBIMGPATH + imgPath + 'Series' + '/' + filepath;

										Fileupload.addFileInfo(fileupload, function (err, file) {
											if (err) return res.json({ err, status: 'error' });
											if (file) {
												return res.json({
													status: 200,
													message: 'File addedd successfully'
												});
											}
										});

									} else {


									}
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
											// if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
											// 	return callback(res.end('Only Images are allowed'), null)
											// }
											return callback(null, true);
										}
									}).single('file');

									upload(req, res, function (err) {
										if (err) return res.json({ err, status: 'error' });

										var fileupload = new Fileupload({
											filepath: final_path + '/' + filepath,
											status: true,
											createdDateTime: new Date()
										});
										dicomFileAsBuffer = fs.readFileSync(fileupload.filepath);
										dataSet = dicom.parseDicom(dicomFileAsBuffer);

										/*Dicom Read Image Data */
										var name = (dataSet.string('x00100010'));
										var patID = (dataSet.string('x00100020'));
										var age = (dataSet.string('x00101010'));
										var modality = (dataSet.string('x00080060'));
										var gen = (dataSet.string('x00100040'));
										var accss = (dataSet.string('x00080050'));
										var desc = (dataSet.string('x0008103e'));
										var bDate = (dataSet.string('x00100030'));


										fileupload.createdBy = loggedInUser.user._id
										fileupload.name = name;
										fileupload.patientID = patID;
										fileupload.patientAge = age;
										fileupload.modality = modality;
										fileupload.patientSex = gen;
										fileupload.accession = accss;
										fileupload.description = desc;
										fileupload.bdate = bDate;
										fileupload.filepath = DBIMGPATH + imgPath + 'Series' + '/' + filepath;


										Fileupload.addFileInfo(fileupload, function (err, file) {
											if (err) return res.json({ err, status: 'error' });
											if (file) {
												return res.json({
													status: 200,
													message: 'File addedd successfully'
												});
											}
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
	router.get('/getAllImgInfoById/:Id', verifyToken, (req, res) => {

		jwt.verify(req.token, secret, function (err, loggedInUser) {
			if (err) {
				return res.status(403);
			} else {
				var pId = req.params.Id;
				console.log(pId)
				// var user_id = loggedInUser.user._id
				Fileupload.getAllImgInfoById(pId, function (err, fileList) {
					if (err) res.status(403);
					if (fileList) {
						return res.json(fileList);
					}
				});
				// Fileupload.getAllImgInfo(user_id, function (err, fileList) {
				// 	if (err) res.status(403);
				// 	if (fileList) {
				// 		return res.json(fileList);
				// 	}
				// });
			}
		});
	});

	router.get('/getAllImgInfo', verifyToken, (req, res) => {

		jwt.verify(req.token, secret, function (err, loggedInUser) {
			if (err) {
				return res.status(403);
			} else {
				var user_id = loggedInUser.user._id
				Fileupload.getAllImgInfo(user_id, function (err, fileList) {
					if (err) res.status(403);
					if (fileList) {
						return res.json(fileList);
					}
				});
			}
		});
	});

	router.post('/mordalityFilter', verifyToken, function (req, res) {
		jwt.verify(req.token, secret, function (err, loggedInUser) {
			if (err) {
				return res.status(403);
			} else {
				const data = { userID: loggedInUser.user._id, modality: req.body };

				Fileupload.mordalityFilter(data, function (err, mordalityList) {
					if (err) return res.json({ err, status: 'error' });
					if (mordalityList) {
						return res.json(
							mordalityList
						);
					}
				});
			}
		});
	});


	router.post('/deleteFile', verifyToken, (req, res) => {

		jwt.verify(req.token, secret, function (err, user) {
			if (err) {
				return res.status(403);
			} else {
				const file = req.body;
				console.log(file.patientID);
				//Multiple records by patient Id
				Fileupload.update({ "patientID": file.patientID }, { "$set": { "status": false}}, {multi: true}).exec(function(err, data){
					if(err) {
						console.log(err);
						res.status(500).send(err);
					} else {
							 res.status(200).send(data);
					}
				 });
				// Fileupload.deleteFile(file, function (err, user) {
				//     if (err) throw err;
				//     if (user) {
				//         return res.json({
				//             message: 'Deleted success..!'
				//         });
				//     }
				// });
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
}
// router.post('/addFile', verifyToken, (req, res) => {
//     var userId = req.params.uid;
// 	File.getAllVideosByUserId(userId, function (err, files){
//         if (err) return res.json({err, status:'error'});
//         if(files){5
//             return res.json(files);
//         }
//     });
// });