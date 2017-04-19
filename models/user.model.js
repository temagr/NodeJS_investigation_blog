const dataBase = require('../database/database')('Blog', 'admin', '123456', {
        host: 'RUKAVITSINI',
        port: 1543,
        dialect: 'mssql'
    }),
    user = {};

user.getUserInfoByCredentials = (username,password) =>{
  return dataBase(`SELECT userID, Name, Email, Password FROM Users WHERE Name='${username}' and Password='${password}'`);
}

// user.getUserByFacebookId = (id) => {
//   return dataBase(`SELECT userID,Name, facebookId FROM Users WHERE facebookId='${id}'`);
// }

// user.addNewFacebookUser = (facebookId) => {
//   dataBase(`INSERT INTO Users (facebookId) VALUES (${facebookId})`);
// }

module.exports = user;
