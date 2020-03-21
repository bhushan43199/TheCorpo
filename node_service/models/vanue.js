const mongoose = require('mongoose');

const vanueSchema = mongoose.Schema({
    IMG_PATH: { type: String, require: true },
    STATUS: { type: Boolean, require: true },
    CREATED_BY: { type: String, require: true },
    CREATED_DATE: { type: Date, require: true },
    UPDATE_BY: { type: String },
    UPDATE_DATE: { type: Date }
});


var Vanue = module.exports = mongoose.model('Vanue', vanueSchema);


module.exports.create = function (vanue, callback) {
    vanue.save(callback);
}


module.exports.getVanueImagesById = function (userId, callback) {
    var query = {'CREATED_BY': userId, 'STATUS':true};
    Vanue.find(query, callback);
}

module.exports.updateVanue = function (venue, callback) {
    Vanue.updateOne({ _id: venue._id }, { $set: venue }, callback);
}