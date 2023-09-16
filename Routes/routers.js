const express = require("express");
const router = express.Router();
const axios = require("axios");

const { createBlog,getBlogs,getPersonalBlogs,deleteBlog } = require("../Controllers/blogController");
const {userRegister ,userLogin} = require("../Controllers/usersController");
const logger =require("../Middleware/logger");
const upload =require("../Middleware/upload");
const alreadyLoged =require("../Middleware/alreadyLoged");
const { render } = require("ejs");
const jwt = require('jsonwebtoken')

const cookiesParser = require('cookie-parser')
router.use(cookiesParser());









router.get('/authentication',alreadyLoged,(req,res)=>{
  res.render("authentication")
})
// register ###################################################
router.post('/register',upload.single('avatar'),userRegister)

// ###################################################
// login ###################################################
router.post('/login',upload.single('avatar'),userLogin)

// ###################################################






router.get("/addBlog",logger, (req, res) => { res.render("addBlog")});
router.post("/createBlog", logger,upload.single("image"), createBlog);

router.get("/allBlogs",getBlogs);
router.get("/myBlogs",logger, getPersonalBlogs);

router.delete("/delete/:id",deleteBlog);
module.exports = router;
