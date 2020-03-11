const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Super Admin = 0
// Company Owner = 1
// Customer = 2

const companySchema = mongoose.Schema({

    comp_name: { type: String },
    comp_address: { type: String },
    acc_no: { type: String },
    acc_type: { type: String },
    ifsc_code: { type: String },
    branch_name: { type: String },
    doc_id_proof: { type: String },
    photo_id_proof: { type: String },
    passbook_proof: { type: String },
    yearestablish: { type: String },
    website: { type: String },
    comp_phone: { type: String },
    comp_email: { type: String },
    type: { type: String },
    user_id:{ type: String , ref: 'User'},
    status: { type: Boolean, require: true },
    createdBy: { type: String, require: true },
    createdDateTime: { type: Date, require: true },
    updatedBy: { type: String },
    updatedDate: { type: Date },
});

var Company = module.exports = mongoose.model('Company', companySchema);

module.exports.createCompany = function (company, callback) {
    company.save(callback);
}


module.exports.updateCompany = function (company, callback) {
    Company.updateOne({ _id: company._id }, { $set: company }, callback);
}

module.exports.getAllCompanyUsers = function (callback) {
    Company.
        find().
        sort({createdDateTime: 'desc'}).
        populate("user_id", null).
        exec(callback);
}




