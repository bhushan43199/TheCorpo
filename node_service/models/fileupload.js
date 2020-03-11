const mongoose = require('mongoose');
// const fs = require('fs-extra');

// const DOCPATH = 'D:/Sahil/Project/taralux/src/assets/uploads';
const fileuplaodSchema = mongoose.Schema({

    filepath: { type: String, require: true },
    name: { type: String },
    patientID: { type: Number },
    patientSex: { type: String },
    patientAge: { type: String },
    modality: { type: String },
    accession: { type: String },
    description: { type: String },
    bdate: { type: Date },
    userId: { type: String, require: true },
    status: { type: Boolean },
    createdBy: { type: String, require: true },
    createdDateTime: { type: Date, require: true },
    updatedBy: { type: String },
    updatedDate: { type: Date }

});



var File = module.exports = mongoose.model('imgInfo', fileuplaodSchema);

module.exports.addFileInfo = function (data, callback) {
    data.save(callback);
}

module.exports.getAllVideosByUserId = function (uid, callback) {
    var query = { userId: uid, status: true };
    File.find(query, callback);
}
module.exports.getAllImgInfo = function (userId, callback) {
    var query = { 'createdBy': userId, status: true }
    File.find(query, callback);
}

module.exports.getAllImgInfoById = function (pid, callback) {
    var query = { 'patientID': pid, status: true }
    File.find(query, callback);
}


module.exports.mordalityFilter = function (data, callback) {

    if (data.modality.name == 'All') {
        var query = { 'createdBy': data.userID }
        File.find(query, callback);

    } else {

        var query = { 'modality': data.modality.name, 'createdBy': data.userID }
        File.find(query, callback);
    }

}

module.exports.deleteFile = function (file, callback) {

    //    var ff=DOCPATH +'/'+ file.createdBy;
    //     fs.rmdir(ff,{ recursive: true });
    //     File.remove({'createdBy':file.createdBy},callback)
    var query = { status: false };
    File.update({ 'createdBy': file.createdBy }, { $set: query }, callback);
}