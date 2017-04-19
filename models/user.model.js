const DB = require('../config/constants');

const dataBase = require('../database/database')(DB.BLOG, 'admin', '123456', {
        host: 'RUKAVITSINI',
        port: 1543,
        dialect: 'mssql'
    }),
    user = {};

user.getUserInfoByCredentials = (username,password) =>{
  return dataBase(
            `SELECT ${DB.columns.BLOG.USERS.USER_ID},
                    ${DB.columns.BLOG.USERS.NAME},
                    ${DB.columns.BLOG.USERS.EMAIL},
                    ${DB.columns.BLOG.USERS.PASSWORD}
            FROM ${DB.tables.BLOG.USERS}
            WHERE ${DB.columns.BLOG.USERS.NAME}='${username}'
                  and ${DB.columns.BLOG.USERS.PASSWORD}='${password}'`
          );
}

// user.getUserByFacebookId = (id) => {
//   return dataBase(`SELECT userID,Name, facebookId FROM Users WHERE facebookId='${id}'`);
// }

// user.addNewFacebookUser = (facebookId) => {
//   dataBase(`INSERT INTO Users (facebookId) VALUES (${facebookId})`);
// }

module.exports = user;
