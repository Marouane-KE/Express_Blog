const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const secret="lmkawi";




exports.userRegister= async(req,res)=>{
    const {username,password,email} = req.body
    const users=await axios.get('http://localhost:8100/users')
    const usersArray= users.data
    const message = 'email already used,try another email'
    const userEmail=usersArray.find(user => user.email==email)
    if (userEmail) {
      
      return res.status(401).send("emil found")  
          
    }
    const saltRounds = 10;
    const avatar = req.file
    const user=Date.now().toString(36) + Math.random().toString(36).slice(2)
    // console.log(avatar)

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          res.status(500).json({ error: 'Failed to hash password' });
          
        }
         const userData ={user:user,
            username:username,
            password:hash,
            email:email,
            avatar:avatar.filename}
            // console.log(userData)
            
            axios.post('http://localhost:8100/users',userData)
    });

    
    const token = jwt.sign({email:email,username:username,user:user,avatar:avatar.filename},secret)
    res.cookie('token_auth',token)
    res.redirect('/home')
  }
  // login ##################################################
  exports.userLogin=async (req,res)=>{
    const {password,email} = req.body
    const users= await axios.get('http://localhost:8100/users')
    const usersData =users.data;
    const user = usersData.find((user) => user.email === email);
    const hashedpassword = await user.password
    
    // console.log(user.password)

    bcrypt.compare(password, hashedpassword, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to compare passwords' });
      }
    
      if (result) {
        // Passwords match - User is authenticated
      const token = jwt.sign({email:email,username:user.username,user:user.user,avatar:user.avatar},secret)
      
      res.cookie('token_auth',token)
      // res.status(200).json({ message: 'Login successful' });
      res.redirect('/home')
      } else {
        // Passwords don't match - Invalid credentials
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  }

  exports.logout=(req, res) => {
    res.clearCookie('token_auth');
    res.redirect('/home'); 
 
}