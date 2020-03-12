const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const session = require('express-session');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const http = require('http');
const https = require('https');
const grpc = require('grpc');
var fs  = require('fs');
var multer = require('multer');
var upload = multer();

//  var httpOptions =  {
//      key: fs.readFileSync("/etc/kurento/hirebingo.key"),
//      cert: fs.readFileSync("/etc/kurento/STAR_hirebingo_com.crt")
//  };

helmet = require("helmet");

require('./passport')(passport);

mongoose.connect('mongodb://localhost:27017/corporate_connection',{
    useNewUrlParser: true 
});

const app = express();

// const routes = require('./routes/index');
const auth = require('./routes/auth')(passport);
const user = require('./routes/user')(passport);
const email = require('./routes/email')(passport);
const company = require('./routes/company')(passport);

// app.use(upload.array()); 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(cookieParser());

app.use(flash());
//Express Session
app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave:true
}));

//Cors Handle
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    if (req.method === 'PATCH'){
        res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express Validators
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param:formParam,
            msg : msg,
            value:value
        };
    }
}));


//Add Routes here
app.use('/auth', auth);
app.use('/user', user);
app.use('/company', company);
app.use('/email', email);


// For production use this 

// var port = process.env.PORT || 5000;
// var server = https.createServer(httpOptions, app)
//   .listen(port, 'services.hireamigo.com', function () {
//     console.log('Example app listening on port 8080! Go to https://localhost:8080/')
// });
// For Locally use this 

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function(){
    console.log('Server Started on port ' + app.get('port'));
});
