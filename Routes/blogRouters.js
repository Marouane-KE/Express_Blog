const express = require('express')
const router = express.Router();
const axios = require('axios');
const multer = require('multer')
// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './Public/uploads/'); // Store uploaded files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Set a unique filename
    },
  });
  
  const upload = multer({ storage: storage });
  
router.get('/addBlog',(req,res)=>{
    res.render('addBlog')
})
router.post('/createBlog' ,upload.single('image'),(req,res)=>{
    
    const {title,author,description}=req.body;
    const image=req.file
    console.log(image)
    axios.post('http://localhost:8100/blogs',{title,author,description,image:image.filename})

    res.render('allBlogs')
})









module.exports= router