const express = require("express");
const accessKey = "bb166d9950a39e2da854d9c847a111d5f22a331357f3d519c54317a534579d4587b0ba1d6f5ec977fa72c128d34dc04415a752d30aa690a085c898b63c1fc394";
const jwt = require("jsonwebtoken");
const { cafePool } = require("../utils/db-connection");
const router = express.Router();
const nodemailer = require('nodemailer')
const checkRole = require('../services/checkRole')
const auth = require('../services/authentication')



// add category---- which is only allow to admin 
router.post('/add', auth.authenticateToken, checkRole, async (req, res) => {
  try {

    let body = req.body;
    let query = `INSERT INTO category (name) value ('${body.name}')`
    let [result, fields] = await cafePool.query(query);
    if (result) {
      return res.status(200).json({
        message: "category success added",
      });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
})

// fetch list of category---- this is for all user;
router.get('/get', auth.authenticateToken, async (req, res) => {
  try {

    let body = req.body;
    let query = `select id,name from category`
    let [result, fields] = await cafePool.query(query);
    res.status(200).json({ message: "success", data: result })
    return
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// update category which is also by only admin--

router.patch('/update', auth.authenticateToken, checkRole, async (req, res) => {
  try {

    let body = req.body;
    let query = `update category set name = ${body.name} where id = ${body.id}`
    let [result, fields] = await cafePool.query(query);
    if (result.affectedRows == 0) {
      return res.status(404).json({ message: "category not exists" })
    } else {
      return res.status(200).json({ message: "category Successfully updated" })
    }
    return
  } catch (error) {
    res.status(500).json({ error: error })
  }
})



