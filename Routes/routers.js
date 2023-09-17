const express = require("express");
const router = express.Router();
const axios = require("axios");

const { createBlog,getBlogs,getPersonalBlogs,deleteBlog,editBlog, updateBlog,blogDetails} = require("../Controllers/blogController");
const {userRegister ,userLogin,logout} = require("../Controllers/usersController");
const logger =require("../Middleware/logger");
const upload =require("../Middleware/upload");
const alreadyLoged =require("../Middleware/alreadyLoged");
const { render } = require("ejs");
const jwt = require('jsonwebtoken')

const cookiesParser = require('cookie-parser')
router.use(cookiesParser());









router.get('/authentication',alreadyLoged,(req,res)=>{
  res.render("myaccount")
})
// register ###################################################
router.post('/register',upload.single('avatar'),userRegister)

// ###################################################
// login ###################################################
router.post('/login',upload.single('avatar'),userLogin)

// ###################################################






// router.get("/addBlog",logger, (req, res) => { res.render("addBlog")});
// router.post("/createBlog", logger,upload.single("image"), createBlog);

router.get("/addBlog",logger, (req, res) => { res.render("createBlog")});
router.post("/createBlog2", logger,upload.single("image"), createBlog);

// router.get("/allBlogs",getBlogs);
router.get('/home',getBlogs)

// router.get("/myBlogs",logger, getPersonalBlogs);
router.get("/profile",logger, getPersonalBlogs);

router.delete("/delete/:id",deleteBlog);
// router.get("/edit/:id",editBlog);
router.get("/editMyBlogs/:id",editBlog);
router.get("/blogDetails/:id",blogDetails);
router.post("/update/:id",upload.single("image"),updateBlog);

router.get('/logout', logout);
router.get('/about', (req,res)=>{res.render('about')});
router.get('/comingSoon', (req,res)=>{res.render('comingSoon')});



router.use((req, res, next) => res.render("404"));


module.exports = router;
