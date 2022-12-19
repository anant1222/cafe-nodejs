
    async function checkRole(){

        if(req.locals.role =='USER'){
            return resizeBy.sendstatus(401)
        }else next()
    }


    module.exports = {checkRole}
