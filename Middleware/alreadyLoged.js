
const jwt = require('jsonwebtoken')
const secret="lmkawi";

const alreadyLoged =(req,res,next)=>{
    const token = req.cookies.token_auth
   
    if(token){
        return res.redirect('/allBlogs')
    } 
    next()
  }
  module.exports= alreadyLoged;