const jwt = require('jsonwebtoken')
const secret = 'adminganteng'

const isAdmin = (req,res,next) => {
    const token = req.header('Authorization')

    if(token){
        const auth = token.split(" ")[1]
        console.log(auth);

        jwt.verify(auth, secret, (err, user)=>{
            if (err) {
                return res.sendStatus(403)
            }
            req.user = user
            next()
        })
    }else{
        res.sendStatus(401)
    }
}

module.exports = isAdmin