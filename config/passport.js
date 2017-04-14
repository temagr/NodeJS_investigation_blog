const LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    dataBase = require('../database/database')('Blog', 'admin', '123456', {
        host: 'RUKAVITSINI',
        port: 1543,
        dialect: 'mssql'
    });

module.exports = function(passport){

  passport.serializeUser(function(user, done) {
      done(null, user);
  });

  passport.deserializeUser(function(user, done) {
      done(null, user);
  });

  passport.use('local', new LocalStrategy((username, password, done) => {
      dataBase(`SELECT userID,username, password FROM Credentials WHERE username='${username}' and password='${password}'`).spread((result, metadata) => {
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
}
