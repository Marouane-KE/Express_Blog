const axios = require('axios');
const jwt =require("jsonwebtoken");



exports.createBlog=(req,res)=>{
    
    const {title,author,description}=req.body;
    const image=req.file
    const userId = req.userId
    console.log(userId)

    axios.post('http://localhost:8100/blogs',{title,author,description,userId,image:image.filename})
    
    res.redirect('addBlog')
}

exports.getBlogs=async(req, res) => {

    let fetchBlogs= await axios.get('http://localhost:8100/blogs');
    let blogs =await fetchBlogs.data;
    // console.log(blogs)
    
    res.render("allBlogs",{blogs});

  }
exports.getPersonalBlogs=async(req, res) => {
    const userId = req.userId
    let fetchBlogs= await axios.get('http://localhost:8100/blogs');
    let blogs =await fetchBlogs.data;
    const filteredBlogs = blogs.filter((b) => b.userId===userId );
    // console.log(filteredBlogs)
    
    res.render("myBlogs",{filteredBlogs});

  }

  // const id = req.params.id;
  // console.log(id)
  // const x =await axios.get(`http://localhost:8100/blogs/${id}`)
  // console.log(x.data)
  exports.deleteBlog= async (req,res) => {
    axios.delete(`http://localhost:8100/blogs/${id}`)
    .then(()=>{
      res.status(204).send("blog deleted")
    }).catch(()=>{
      return res.status(500).send('server problem')
    })

  }