const axios = require('axios');
const jwt =require("jsonwebtoken");



exports.createBlog=(req,res)=>{
    
    const {title,description,blogDetails}=req.body;
    const image=req.file
    const user = req.user
    const author = req.username
    
  //  console.log(user)

    axios.post('http://localhost:8100/blogs',{title,author,description,blogDetails,user,image:image.filename})
    
    res.redirect('home')
}

exports.getBlogs=async(req, res) => {
  const token = req.token
    let fetchBlogs= await axios.get('http://localhost:8100/blogs');
    let blogs =await fetchBlogs.data;
    // console.log(blogs)
    
    res.render("home",{blogs , token});

  }
exports.getPersonalBlogs=async(req, res) => {
    const user = req.user
    const avatar =req.avatar
    
    const username =req.username
    
    
    const token = req.token
    let fetchBlogs= await axios.get('http://localhost:8100/blogs');
    let blogs =await fetchBlogs.data;
    const filteredBlogs = blogs.filter((b) => b.user===user );
    // console.log(filteredBlogs)
    
    res.render("profile",{filteredBlogs,token,avatar,username});

  }

  // console.log(x.data)
  
  exports.deleteBlog= async (req,res) => {
    const id = req.params.id;
    // console.log(id)
    axios.delete('http://localhost:8100/blogs/'+id)
    .then(()=>{
      res.status(204).send("blog deleted")
    }).catch(()=>{
      return res.status(500).send('server problem')
    })
    
  }
  exports.editBlog= async (req,res)=>{
    const id = req.params.id;
    const token = req.token;
    const api = await axios.get('http://localhost:8100/blogs/'+id)
    const blog = await api.data
    
    res.render('editMyBlogs',{blog , token})
  }
  exports.blogDetails= async (req,res)=>{
    const id = req.params.id;
    const token = req.token;
    const api = await axios.get('http://localhost:8100/blogs/'+id)
    const blog = await api.data
    
    res.render('blogDetails',{blog ,token})
  }

  exports.updateBlog= async (req,res)=>{
    console.log(req.body,req.file)
    const id = req.params.id;
    const api = await axios.get('http://localhost:8100/blogs/'+id)
    const blog = await api.data
    console.log(blog)
    
    const updateBlog = {
      title: req.body.title,
      blogDetails: req.body.blogDetails,
      description: req.body.description,
      image: req.file?req.file.filename:blog.image    
    }
    axios.patch('http://localhost:8100/blogs/'+id , updateBlog).then(()=>{
      res.redirect('/profile')
    })
  }
  