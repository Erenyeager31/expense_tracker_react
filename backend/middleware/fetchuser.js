// const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const fetchuser = (req,res,next) => {
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({place:"above",error:"Invalid authentication token"})
        // cons
    }
    try {
        const data = jwt.verify(token,"dishantis#$here")
        // console.log(data)
        req.user = data
        next()
    } catch (error) {
        res.status(401).send({error:"Invalid authentication token"})
    }
}

module.exports = fetchuser