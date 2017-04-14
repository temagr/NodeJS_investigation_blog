const Sequelize = require('sequelize');

const connect = (...args) => {
    let dataBase = new Sequelize(...args);
    return function(sql){
      return dataBase.query(sql);
    };
}

module.exports = connect;
