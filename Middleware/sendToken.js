
const sendToken =(req,res,next)=>{
    const token = req.cookies.token_auth
    req.token = token
    
    next()
  }
  module.exports= sendToken;