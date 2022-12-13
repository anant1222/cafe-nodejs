'use strict';
const Sequelize = require('sequelize');
const config = require('../connection')
const chalk = require('chalk');

const cafePool = new Sequelize(config.cafeDatabase.database, config.cafeDatabase.user,
    config.cafeDatabase.password, {
    //timezone: '+05:30', //here you can pass timezone
    host: config.cafeDatabase.host,
    dialect: 'mariadb',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});


cafePool.authenticate()
    .then(() => {
        console.log(chalk.green('Mysql Connection has been established successfully for cafePool.'));
    })
    .catch(err => {
        console.log(chalk.red('Unable to connect to the cafePool database: ', err));
        throw new Error('mysql error: Connection Failure');
    })

module.exports = {
    cafePool
};