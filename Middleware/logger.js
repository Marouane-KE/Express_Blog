
const jwt = require('jsonwebtoken')
const secret="lmkawi";

const logger =(req,res,next)=>{
    const token = req.cookies.token_auth
    if(!token){
        return res.redirect('/authentication')
    }
    const decoded = jwt.verify(token,secret)
    if(!decoded){
         res.redirect('/authentication')
    }
    const {email,avatar,user,username } = decoded
    req.email = email
    req.avatar = avatar
    req.user = user
    req.username=username
    next()
  }
  module.exports= logger;