var apiai = require('apiai');
// var app = apiai("25f387c8103040668ddbff058e5aa640");//new  testing bot
var app = apiai("c7642054715a41d39d1fca74d3463716");//hirebingo
// Function which returns speech from api.ai
var getRes = function (query) {
    console.log(query);
    var request = app.textRequest(query, {
        sessionId: 'Test1'
    });
    const responseFromAPI = new Promise(
        function (resolve, reject) {
            request.on('error', function (error) {
                reject(error);
            });
            request.on('response', function (response) {
                resolve(response.result.fulfillment.speech);
            });
        });
    request.end();
    return responseFromAPI;
};
// test the command :
//getRes('hello').then(function(res){console.log(res)});
module.exports = { getRes }