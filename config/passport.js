const LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('../models/user.model'),
    configAuth = require('./auth');


module.exports = function(passport){

  passport.serializeUser(function(user, done) {
      done(null, user);
  });

  passport.deserializeUser(function(user, done) {
      done(null, user);
  });

  passport.use('local', new LocalStrategy((username, password, done) => {
      User.getUserInfoByCredentials(username, password)
          .spread((result, metadata) => {
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

  // passport.use(new FacebookStrategy({
  //       clientID        : configAuth.facebookAuth.clientID,
  //       clientSecret    : configAuth.facebookAuth.clientSecret,
  //       callbackURL     : configAuth.facebookAuth.callbackURL
  //   },
  //   (token, refreshToken, profile, done) => {
  //       process.nextTick(() => {
  //           User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
  //               if (err)
  //                   return done(err);
  //               if (user) {
  //                   return done(null, user);
  //               } else {
  //                   var newUser            = new User();
  //                   newUser.facebook.id    = profile.id; // set the users facebook id
  //                   newUser.facebook.token = token; // we will save the token that facebook provides to the user
  //                   newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
  //                   newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
  //                   newUser.save(function(err) {
  //                       if (err)
  //                           throw err;
  //                       return done(null, newUser);
  //                   });
  //               }
  //           });
  //       });
  //
  //   }));

}
