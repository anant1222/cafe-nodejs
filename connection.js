const mysql = require('mysql');
require('dotenv').config
let cafeDatabase={
    port:3306,
    host:'localhost',
    user:'root',
    password:'root',
    database:'cafe_mngt_syst'}

module.exports = {
    cachyPool: mysql.createPool(cafeDatabase),
    cafeDatabase
}