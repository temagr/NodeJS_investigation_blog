const LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('../models/user.model'),
    configAuth = require('./auth');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use('local', new LocalStrategy((username, password, done) => {
        User.getUserInfoByCredentials(username, password).spread((result, metadata) => {
            if (result.length === 1) {
                return done(null, {
                    userId: result[0].userId,
                    username: result[0].username
                });
            } else {
                return done(null, false);
            }
        });
    }));

    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL
    }, (token, refreshToken, profile, done) => {
        process.nextTick(() => {
            User.getUserByFacebookId(profile.id).spread((result, metadata) => {
                if (result.length === 1) {
                    return done(null, {
                        userId: result[0].userId,
                        username: result[0].username
                    });
                } else {
                    User.addNewFacebookUser(profile.id);
                    return done(null, {facebookId: profile.id});
                }
            })
        });
    }));
}
