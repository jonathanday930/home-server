const jwt = require('jsonwebtoken')
const config= require('config')

module.exports = function auth (req,res,next){
    const token = req.cookies.jwt_token
    console.log('authenticating user...')
    if (!token) return res.status(401).render('user/invalidToken')

    try{
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'))
        console.log('Authenticated!')
        req.user = decoded
        next();
    }catch(ex){
        res.status(400).send('Invalid token.')

    }

}