const jwt = require('jsonwebtoken')
const accessKey ="bb166d9950a39e2da854d9c847a111d5f22a331357f3d519c54317a534579d4587b0ba1d6f5ec977fa72c128d34dc04415a752d30aa690a085c898b63c1fc394";
async function authenticationToken(req,res,next){

    const authHeader = req.headers['authorization']
    const token  = authHeader && authHeader.split(' ')[1]
    if(token == null){
        return res.sendStatus(401)
    }
    await jwt.verify(token,accessKey,async (err,response)=>{
        if(err){
            res.sendStatus(403)
        }
        res.locals = response
        next();
    })

}


module.exports ={authenticateToken:authenticationToken}