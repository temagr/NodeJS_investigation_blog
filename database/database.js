const Sequelize = require('sequelize');

const connect = (...args) => {
  let dataBase = new Sequelize(...args);

  dataBase
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      global.serverError = true;
      console.warn('Unable to connect to the database:', err);
    });

  return function (sql) {
    return dataBase.query(sql);
  };
}

module.exports = connect;
