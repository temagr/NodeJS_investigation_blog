const LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    Model = require('../models/blog.model'),
    configAuth = require('./auth'),
    DB = require('./constants');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use('local', new LocalStrategy((username, password, done) => {
        Model.USERS.getUserByCredentials(username, password)
        .spread((result, metadata) => {
            if (result.length === 1) {
                global.User = {
                    id: result[0][`${DB.columns.BLOG.USERS.USER_ID}`],
                    name: result[0][`${DB.columns.BLOG.USERS.NAME}`],
                    password: result[0][`${DB.columns.BLOG.USERS.PASSWORD}`]
                };
                return done(null, {
                    userId: result[0][`${DB.columns.BLOG.USERS.USER_ID}`],
                    username: result[0][`${DB.columns.BLOG.USERS.NAME}`]
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
            Model.USERS.getUserByFacebookId(profile.id).spread((result, metadata) => {
                if (result.length === 1) {
                    return done(null, {
                        userId: result[0].userId,
                        username: result[0].username
                    });
                } else {
                    Model.USERS.addNewFacebookUser(profile.id);
                    return done(null, {facebookId: profile.id});
                }
            })
        });
    }));
}
