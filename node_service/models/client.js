const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const clientSchema = mongoose.Schema({

    guid: mongoose.Schema.Types.ObjectId, 
    email: { type: String, require: true },
    name: { type: String, require: true },
    fname: { type: String, require: true },
    lname: { type: String, require: true },
    orgName: { type: String, require: true },
    companyId: { type: String, require: true },
    userType: { type: Number, require: true },
    website: { type: String, require: true },
    client_secretKey: { type: String, require: true },
    access_token: { type: String },
    phone: { type: String },
    fax: { type: String },
    address: { type: String, require: true },
    city: { type: String },
    state: { type: String },
    zip: { type: Number, require: true },
    status: { type: Boolean, require: true },
    createdBy: { type: String, require: true },
    createdDateTime: { type: Date, require: true },
    updatedBy: { type: String },
    updatedDate: { type: Date },
    filePath: { type: String },
    filePath1: { type: String },
    companyname: { type : String},
    editorData: {type: String},
    username: { type: String, require: true }, 
});

var Client = module.exports = mongoose.model('Client', clientSchema);

module.exports.addNewClient = function (newClient, callback) {
    // newClient.save(callback);
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newClient.password, salt, function (err, hash) {
            newClient.password = hash;
            newClient.save(callback);
        });
    });
}
// module.exports.userStatus = function (data, callback) {

//     if(data.status==true){
//         var query = { status: false };
//         Client.update({ createdBy: data.createdBy }, { $set: query }, callback);
//     }else{

//         var query = { status: true };
//         Client.update({ createdBy: data.createdBy }, { $set: query }, callback);
//     }
 
// }

module.exports.userStatus = function (data, callback) {

    if(data.status==true && data.createdBy!=undefined){
        var query = { status: false };
        Client.update({ 'createdBy': data.createdBy }, { $set: query }, callback);
    }else if(data.status==false && data.createdBy!=undefined) {

        var query1 = { status: true };
        Client.update({ 'createdBy': data.createdBy }, { $set: query1 }, callback);
    }
  
    
 
}
module.exports.getAllClients = function (userObj, callback) {
    if (userObj.user.userType == 0){

        var query={ 'userType': { $ne: 0 }}
        Client.find(query,callback);
    } else if (userObj.user.userType == 1) {
        var query={ 'userType': 1}
        Client.find(query,callback);
    }  else if (userObj.user.userType == 2  ) {

        var query={ 'userType': 2}
        Client.find(query,callback);
    }
    // if (user.user.userType == 0) {  //Super Admin
    //     Client
    //         .where('status', true)
    //         .exec(callback);
    // } else if (user.user.userType == 1) {   // Client Admin
    //     Client
    //         .where('status', true)
    //         .where('createdBy', user.user._id)
    //         .exec(callback);
    // }
}

// module.exports.getAllClients = function (callback) {
//     Client.find(callback);
// }

module.exports.getClientsbyId = function (comId, callback) {
    query = { 'companyId': comId.clientid, status: true }
    Client.findOne(query, callback);
}

module.exports.updateClient = function (client, callback) {
    Client.update({ _id: client._id }, { $set: client }, callback);
}

module.exports.deleteClient = function (cliID, callback) {
    var query = { status: false };
    Client.updateOne({ _id: cliID }, { $set: query }, callback);
}

module.exports.updateclientimage = function (client, callback) {
    Client.updateOne({ _id: client._id }, { $set: client }, callback);
}