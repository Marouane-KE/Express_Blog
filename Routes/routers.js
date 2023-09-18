const express = require("express");
const router = express.Router();
const axios = require("axios");

const { createBlog,getBlogs,getPersonalBlogs,deleteBlog,editBlog, updateBlog,blogDetails} = require("../Controllers/blogController");
const {userRegister ,userLogin,logout} = require("../Controllers/usersController");
const logger =require("../Middleware/logger");
const upload =require("../Middleware/upload");
const alreadyLoged =require("../Middleware/alreadyLoged");
const sendToken =require("../Middleware/sendToken");
const { render } = require("ejs");
const jwt = require('jsonwebtoken')

const cookiesParser = require('cookie-parser')
router.use(cookiesParser());


router.get('/authentication',alreadyLoged,sendToken,(req,res)=>{const token = req.token;
  res.render("myaccount",{token})
})
// register ###################################################
router.post('/register',upload.single('avatar'),userRegister)

// ###################################################
// login ###################################################
router.post('/login',upload.single('avatar'),userLogin)

// ###################################################

// router.get("/addBlog",logger, (req, res) => { res.render("addBlog")});
// router.post("/createBlog", logger,upload.single("image"), createBlog);

router.get("/addBlog",logger,sendToken, (req, res) => {const token = req.token; res.render("createBlog",{token})});
router.post("/createBlog2", logger,upload.single("image"), createBlog);

// router.get("/allBlogs",getBlogs);
router.get('/home',sendToken,getBlogs)

// router.get("/myBlogs",logger, getPersonalBlogs);
router.get("/profile",logger,sendToken, getPersonalBlogs);

router.delete("/delete/:id",deleteBlog);
// router.get("/edit/:id",editBlog);
router.get("/editMyBlogs/:id",sendToken,editBlog);
router.get("/blogDetails/:id",sendToken,blogDetails);
router.post("/update/:id",upload.single("image"),updateBlog);

router.get('/logout', logout);
router.get('/about',sendToken, (req,res)=>{const token = req.token; res.render('about',{token})});
router.get('/comingSoon',sendToken, (req,res)=>{const token = req.token; res.render('comingSoon',{token})});



router.use(sendToken,(req, res, next) => {const token = req.token; res.render("404",{token})});


module.exports = router;
