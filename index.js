const express = require('express')
const  cors = require('cors')
const connection = require('./connection')
const router = require('./routes')
const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/user',router.userRouter)
app.use('/category',router.categoryRouter)

module.exports = app;