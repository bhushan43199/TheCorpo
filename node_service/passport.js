const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const Client = require('./models/client');
var secret = 'corporate-token';

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.getUserByID(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({
            usernameField: 'EMAIL',
            passwordField: 'PASSWORD',
            passReqToCallback: true,
            session: false
          },     
        function (req, username, password, done) {
            User.getUserByUsername(username, function (err, user) {
                if (err) throw err;
                if (!user) {
                    return done(null, false, {
                        message: 'Unknown User'
                    });
                }

                User.comparePassword(password, user.PASSWORD, function (err, isMatch) {
                    // console.log('comparePassword is calling..');
                    if (err) throw err;
                    if (isMatch) {                       
                        return done(null, user);                   
                    } else {
                        return done(null, false, {
                            message: 'Invalid Password'
                        });
                    }
                })
            });
        }
    ));
}