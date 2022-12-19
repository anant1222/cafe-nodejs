const express = require("express");
const accessKey ="bb166d9950a39e2da854d9c847a111d5f22a331357f3d519c54317a534579d4587b0ba1d6f5ec977fa72c128d34dc04415a752d30aa690a085c898b63c1fc394";
const jwt = require("jsonwebtoken");
const { cafePool } = require("../utils/db-connection");
const router = express.Router();
const nodemailer = require('nodemailer')
const checkRole = require('../services/checkRole')
const auth= require('../services/authentication')

// signup api
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



// login api
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


// forgot password api
router.post("/forgotpassword", async (req, res) => {
  let user = req.body;
  let query = `select email,password,role,status from user where email = '${user.email}'`;
  let [result, fields] = await cafePool.query(query);
  if (result.length <= 0) {
    return res.status(200).json({ message: "password send to your email" });
  } else if (result.length >= 1) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'anydec22@gmail.com', // generated ethereal user
        pass: 'elatiiseohdpjpwd', // generated ethereal password
      }
    });
    let mailOptions = {
      from: '"Any Inc." <anydec22@gmail.com>', // sender address
      to: user.email,
      subject: 'Forgot Passowrd',
      html: `<html><b>Hello and welcome to cachy</b></html>`
    };
    transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log(error);
      }
      console.log(response)
    });
    return res.status(200).json({ message: "check your mail" });
  } else {
    return res.status(401).json({ message: "wait for admin approval" });

  }
});


// list of all user api..
router.get('/getAll',auth.authenticateToken, async (req, res) => {
  try {
    let query = `select id,name,contactNumber,email,role,status from user`
    let [result, fields] = await cafePool.query(query);
    res.status(200).json({ message: "success", data: result })

  } catch (error) {
    res.status(500).json({ error: error })
  }
})


// user list of user not admin
router.get('/get',auth.authenticateToken, async (req, res) => {
  try {
    let query = `select id,name,contactNumber,email,role,status from user where role = 'USER'`
    let [result, fields] = await cafePool.query(query);
    res.status(200).json({ message: "success", data: result })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.patch('/update',auth.authenticateToken, async (req, res) => {
  try {
    let user = req.body
    let query = `update user set status = 'ACTIVE' where id = ${user.id}`
    let [result, fields] = await cafePool.query(query);
    if(result.affectedRows == 0){
      return res.status(404).json({message:"user not exists"})
    }else{
      return res.status(200).json({message:"Successfully updated"})
    }
  } catch (error) {
    res.status(500).json({ error: error })
  }
})


router.get('/checkToken',(req,res)=>{
  return res.status(200).json({message:'true'})
})


//change passsord
router.post("/changePassword",auth.authenticateToken, async (req, res) => {
  try {
  let user = req.body;
  let email = req.body.email
  let query = `select password from user where email = '${user.email}'`;
  let [result, fields] = await cafePool.query(query);
  if (result.length <= 0) {
    return res.status(400).json({ message: "Incorrect old password" });
  } else if (user.oldPassword === result[0].password) {
    let query = `update user set password = '${user.newPassword}' where  email = '${user.email}'`
    let [result, fields] = await cafePool.query(query);
    return res.status(200).json({ message: "password successfully updated" });
  } else {
    return res.status(500).json({ message: "something went wrong" });

  }
} catch (error) {
  return res.status(500).json({ message: "something went wrong" });
}
});



module.exports = router;
