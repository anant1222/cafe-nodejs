const express = require("express");
const accessKey = "bb166d9950a39e2da854d9c847a111d5f22a331357f3d519c54317a534579d4587b0ba1d6f5ec977fa72c128d34dc04415a752d30aa690a085c898b63c1fc394";
const jwt = require("jsonwebtoken");
const { cafePool } = require("../utils/db-connection");
const router = express.Router();
const nodemailer = require('nodemailer')
const checkRole = require('../services/checkRole')
const auth = require('../services/authentication')


router.post('/add',auth.authenticateToken,async (req,res)=>{
  try {
  let body = req.body;
  let insertQuery = `INSERT INTO product (name,categoryId,description,price)
   values ('${body.name}',${body.categoryId},'${body.description}','${body.price}')`
   let [result, fields] = await cafePool.query(insertQuery);
   if (result) {
     return res.status(200).json({
       message: "product success added",
     });
   } else {
     return res.status(200).json(result);
   }
  } catch (error) {
    return res.status(500).json(result);
  }

})

router.get('/get', auth.authenticateToken, async (req, res) => {
  try {
    let query = `select pt.id, pt.name,pt.description,pt.price,pt.status,ctg.name,ctg.id from product as pt  join category as ctg on category.id = product.categoryId`
    let [result, fields] = await cafePool.query(query);
    res.status(200).json({ message: "success", data: result })
    return
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router

