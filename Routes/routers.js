const express = require("express");
const router = express.Router();
const axios = require("axios");
const multer = require("multer");
const { createBlog,getBlogs } = require("../Controllers/blogController");
const {userRegister } = require("../Controllers/usersController");
const { render } = require("ejs");
const jwt = require('jsonwebtoken')
const secret="lmkawi";
const cookies = require('cookie-parser')
router.use(cookies());


const logger =(req,res,next)=>{
  const token = req.cookies.token_auth
  if(!token){
      return res.redirect('/authentication')
  }
  const decoded = jwt.verify(token,secret)
  if(!decoded){
       res.redirect('/authentication')
  }
  const {email,image } = decoded
  req.email = email
  req.image = image
  next()
}



// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Public/uploads/"); // Store uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Set a unique filename
  },
});

const upload = multer({ storage: storage });


router.get('/authentication',(req,res)=>{
  res.render("authentication")
})
// register ###################################################
router.post('/register',upload.single('avatar'),userRegister)

// ###################################################






router.get("/addBlog",logger, (req, res) => {
  res.render("addBlog");
});
router.post("/createBlog", upload.single("image"), createBlog);

router.get("/allBlogs",logger,getBlogs);


module.exports = router;
