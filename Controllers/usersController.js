const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const secret="lmkawi";




exports.userRegister=(req,res)=>{
    const {username,password,email} = req.body

    const saltRounds = 10;
   


    const avatar = req.file
    const userId=Date.now().toString(36) + Math.random().toString(36).slice(2)
    // console.log(avatar)

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          // Handle the error, possibly by sending an error response
          return res.status(500).json({ error: 'Failed to hash password' });
        }
         const userData ={userId:userId,
            username:username,
            password:hash,
            email:email,
            avatar:avatar.filename}
            // console.log(userData)
            
            axios.post('http://localhost:8100/users',userData)
    });

    
    const token = jwt.sign({email:email,image:avatar.filename,id:userId},secret)
    res.cookie('token_auth',token)
    res.redirect('/allBlogs')
  }