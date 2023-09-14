const express = require("express");
const router = express.Router();
const axios = require("axios");

const { createBlog,getBlogs } = require("../Controllers/blogController");
const {userRegister ,userLogin} = require("../Controllers/usersController");
const logger =require("../Middleware/logger");
const upload =require("../Middleware/upload");
const alreadyLoged =require("../Middleware/alreadyLoged");
const { render } = require("ejs");
const jwt = require('jsonwebtoken')

const cookies = require('cookie-parser')
router.use(cookies());









router.get('/authentication',alreadyLoged,(req,res)=>{
  res.render("authentication")
})
// register ###################################################
router.post('/register',upload.single('avatar'),userRegister)

// ###################################################
// login ###################################################
router.post('/login',upload.single('avatar'),userLogin)

// ###################################################






router.get("/addBlog",logger, (req, res) => {
  res.render("addBlog");
});
router.post("/createBlog", upload.single("image"), createBlog);

router.get("/allBlogs",getBlogs);


module.exports = router;
