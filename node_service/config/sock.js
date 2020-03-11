var app = require('express')();
var io = require('socket.io')(server);
var api = require('./api');
var fs    = require('fs');
var server = require('http').Server(app);

//   var server = require('https').createServer({
//     key: fs.readFileSync("/etc/kurento/hirebingo.key"),
//     cert: fs.readFileSync("/etc/kurento/STAR_hirebingo_com.crt")
//   });

// var server = require('https').createServer({
//     key: fs.readFileSync("./keys/privatekey.pem"),
//     cert: fs.readFileSync("./keys/certificate.pem")
// });

helmet = require("helmet");

var conn = function () {
    io.origins('*:*');
    io.attach(server,{pingInterval : 10000,pingTimeout:5000,cookie:false});
    server.listen(65080);
    app.get('/', function (req, res) {
        res.sendfile(__dirname + '/index.html');
    });
};
var fromClient = function () {
    io.on('connection', function (socket) {
        socket.on('fromClient', function (data) {
            api.getRes(data.client).then(function (res) {
                socket.emit('fromServer', { server: res });
            });
        });
    });
}
module.exports = { conn, fromClient }