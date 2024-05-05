const jwt = require('jsonwebtoken')
module.exports = function(req, res,next){
    try {
        const token = req.header("authorization").replace("Bearer ","")
        const decrypteddata = jwt.verify(token, process.env.SECRET_KEY)
        req.body.userId = decrypteddata.userId
        next()
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
}