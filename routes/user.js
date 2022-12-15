const express = require("express");
const accessKey =
  "bb166d9950a39e2da854d9c847a111d5f22a331357f3d519c54317a534579d4587b0ba1d6f5ec977fa72c128d34dc04415a752d30aa690a085c898b63c1fc394";
const jwt = require("jsonwebtoken");
const { cafePool } = require("../utils/db-connection");
const router = express.Router();
const nodemailer = require('nodemailer')
router.post("/signup", async (req, res) => {
  try {
    let user = req.body;
    let query = `select * from user where email = '${user.email}'`;
    let [result, fields] = await cafePool.query(query);
    if (result && result.length <= 0) {
      let insertQuery = `INSERT INTO user(name,contactNumber,email,password,role)value ('${user.name}','${user.contactNumber}','${user.email}','${user.password}','USER')`;
      let [insertResult, fields] = await cafePool.query(insertQuery);
      if (insertResult) {
        return res.status(200).json({
          message: "Registration success!",
        });
      } else {
        return res.status(500).json(insertResult);
      }
    } else {
      return res.status(200).json({
        message: "User Already Exists!",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  let user = req.body;
  let query = `select email,password,role,status from user where email = '${user.email}'`;
  let [result, fields] = await cafePool.query(query);
  if (result.length <= 0 || user.password != result[0].password) {
    return res.status(401).json({ message: "incorrect username and password" });
  } else if (result[0].role == "false") {
    return res.status(401).json({ message: "wait for admin approval" });
  } else if (user.password == result[0].password) {
    const response = { email: result[0].email, role: result[0].role };
    const accessToken = await jwt.sign(response, accessKey, {
      expiresIn: "8h",
    });
    res.status(200).json({ token: accessToken });
  } else {
    return res
      .status(400)
      .json({ message: "something went wrong, try after sometime" });
  }
});


router.post("/forgotpassword", async (req, res) => {
  let user = req.body;
  let query = `select email,password,role,status from user where email = '${user.email}'`;
  let [result, fields] = await cafePool.query(query);
  if (result.length <= 0) {
    return res.status(200).json({ message: "password send to your email" });
  } else {
    return res.status(401).json({ message: "wait for admin approval" });

  }
});
module.exports = router;
