const express = require("express");
const accessKey = "bb166d9950a39e2da854d9c847a111d5f22a331357f3d519c54317a534579d4587b0ba1d6f5ec977fa72c128d34dc04415a752d30aa690a085c898b63c1fc394";
const jwt = require("jsonwebtoken");
const { cafePool } = require("../utils/db-connection");
const router = express.Router();
const nodemailer = require('nodemailer')
const checkRole = require('../services/checkRole')
const auth = require('../services/authentication')
const initModels = require('../models/init-models')
const sequlize = require('../utils/db-connection').cafePool
const models = initModels(sequlize)


router.post('/add', auth.authenticateToken, async (req, res) => {
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
    // let query = `select pt.id, pt.name,pt.description,pt.price,pt.status,ctg.name as categoryName,ctg.id as categoryId from product as pt  join category as ctg on ctg.id = pt.categoryId`
    // let [result, fields] = await cafePool.query(query);
    let ress = await models.product.findAll({ raw: true })
    res.status(200).json({ message: "success", data: ress })
    return
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/getCategoryById/:id', auth.authenticateToken, async (req, res) => {
  try {
    let params = req.params
    let query = `select pt.id, pt.name,pt.description,pt.price,pt.status,ctg.name as categoryName,ctg.id as categoryId from product as pt  join category as ctg on ctg.id = pt.categoryId where pt.categoryId=${params.id}`
    let [result, fields] = await cafePool.query(query);
    res.status(200).json({ message: "success", data: result[0] })
    return
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/getById/:id', auth.authenticateToken, async (req, res) => {
  try {
    let params = req.params
    let query = `select pt.id, pt.name,pt.description,pt.price,pt.status,ctg.name as categoryName,ctg.id as categoryId from product as pt  join category as ctg on ctg.id = pt.categoryId where pt.id=${params.id}`
    let [result, fields] = await cafePool.query(query);
    res.status(200).json({ message: "success", data: result[0] })
    return
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.patch('/update', auth.authenticateToken, async (req, res) => {
  try {
    let body = req.body
    let query = {
      where: {
        id: body.id
      }
    }
    let attribute = {};
    if (body.name) {
      attribute.name = body.package_name
    }
    if (body.description) {
      attribute.description = body.description
    }
    if (body.price) {
      attribute.price = body.price
    }
    if (body.status) {
      attribute.status = body.status
    }
    let updateData = await models.product.update(attribute, query)
    res.status(200).json({ message: "success", data: result[0] })
    return
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.delete('/delete/:id', auth.authenticateToken, async (req, res) => {
  try {
    let params = req.params
    let query = `delete from user where id = ${params.id}`
    let [result, fields] = await cafePool.query(query);
    res.status(200).json({ message: "success", data: {} })
    return
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.patch('/updateStatus', auth.authenticateToken, async (req, res) => {
  try {
    let body = req.body
    let query = {
      where: {
        id: body.id
      }
    }
    if (body.status) {
      attribute.status = body.status
    }
    let updateData = await models.product.update(attribute, query)
    res.status(200).json({ message: "success", data: {} })
    return
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router

