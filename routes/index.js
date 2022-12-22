`use strict`
const userRouter = require('./user')
const categoryRouter = require('./category')
const ProductRouter = require('./product')
const billRouter = require('./bill')


module.exports = {
    userRouter,
    categoryRouter,
    ProductRouter,
    billRouter
}