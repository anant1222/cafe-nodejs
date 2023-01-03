const express = require("express");
const accessKey = "bb166d9950a39e2da854d9c847a111d5f22a331357f3d519c54317a534579d4587b0ba1d6f5ec977fa72c128d34dc04415a752d30aa690a085c898b63c1fc394";
const jwt = require("jsonwebtoken");
const {
  cafePool
} = require("../utils/db-connection");
const router = express.Router();
const nodemailer = require('nodemailer')
const checkRole = require('../services/checkRole')
const auth = require('../services/authentication')
let ejs = require('ejs');
let pdf = require('html-pdf')
let path = require('path')
let fs = require('fs')
var uuid = require('uuid')
const initModels = require('../models/init-models')
const sequlize = require('../utils/db-connection').cafePool
const models = initModels(sequlize)
const moment = require('moment')
// signup api


router.post("/generateReport", async (req, res) => {
      try {
        const generateUUID = uuid.v1()
        const orderDetails = req.body;
        let currTime = moment().unix() * 1000
        var productDetailsReport = JSON.parse(orderDetails.productDetails)
        let insertData = {
          name: orderDetails.name,
          uuid: generateUUID,
          email: orderDetails.email,
          total: orderDetails.total,
          contactNumber: orderDetails.contactNumber,
          paymentMethod: orderDetails.paymentMethod,
          createdBy: currTime
        };
        let insertRes = await models.bill.create(insertData)
        if (insertRes) {
          let ejsData = await ejs.renderFile(path.join(__dirname, '', 'report.ejs'), {
            productDetails: productDetailsReport,
            name: orderDetails.name,
            email: orderDetails.email,
            contactNumber: orderDetails,
            paymentMethod: orderDetails.paymentMethod,
            totalAmount: orderDetails.totalAmount
          });
              await pdf.create(ejsData).toFile('./generated_pdf/' + generateUUID + ".pdf")
          return res.status(200).json({
            message: "success"
          })
        }
        } catch (error) {
          return res.status(500).json(error);
        }
      });

    module.exports = router;
