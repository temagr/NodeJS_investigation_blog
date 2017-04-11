const Sequelize = require('sequelize');

const connect = (...args) => {
    return new Sequelize(...args);
}

module.exports = connect;
