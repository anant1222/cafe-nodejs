"use strict"
const http = require('http')
require('dotenv').config
const app = require('./index')
const server = http.createServer(app);
console.log(process.env.PORT)
server.listen(8080)
