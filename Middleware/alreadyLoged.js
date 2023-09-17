
const jwt = require('jsonwebtoken')
const secret="lmkawi";

const alreadyLoged =(req,res,next)=>{
    const token = req.cookies.token_auth
   
    if(token){
        return res.redirect('/home')
    } 
    next()
  }
  module.exports= alreadyLoged;