const express = require('express')
const {
    cafePool
  } = require("../utils/db-connection");
const router = express.Router()
router.post('/signup',async (req,res)=>{
    let user = req.body
    let query  = `select * from user`
    let [result, fields] = await cafePool.query(query);




    // cafePool.query(query,[user.email],(err,results)=>{
    //     if(!err){
    //         if(results.length <=0){
    //             query = `INSERT INTO user(name,contactNumber,email,password,role)value (?,?,?,?,'USER')`
    //             cafePool.query(query,[user.name,user.contactNumber,user.email,user.password],(err,result)=>{
    //                 if(!err){
    //                     return res.status(200).json({message:"Registration success!"})
    //                 }else{
    //                     return res.status(500).json(err)
    //                 }
    //             })
    //         }
    //     }else{
    //         return res.status(500).json(err)
    //     }
    // })
})
module.exports = router;