const dataBase = require('../database/database')('Blog', 'admin', '123456', {
        host: 'RUKAVITSINI',
        port: 1543,
        dialect: 'mssql'
    }),
    user = {};

user.getUserInfoByCredentials = (username,password) =>{
  return dataBase(`SELECT userID,username, password FROM Credentials WHERE username='${username}' and password='${password}'`);
}

user.getUserByFacebookId = (id) => {
  return dataBase(`SELECT userID,username, facebookId FROM Credentials WHERE facebookId='${id}'`);
}

user.addNewFacebookUser = (facebookId) => {
  dataBase(`INSERT INTO Credentials (facebookId) VALUES (${facebookId})`);
}

module.exports = user;
