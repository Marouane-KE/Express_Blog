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

    let fetchBlogs= await axios.get('http://localhost:8100/blogs');
    let blogs =await fetchBlogs.data;
    // console.log(blogs)
    
    res.render("home",{blogs});

  }
exports.getPersonalBlogs=async(req, res) => {
    const user = req.user
    let fetchBlogs= await axios.get('http://localhost:8100/blogs');
    let blogs =await fetchBlogs.data;
    const filteredBlogs = blogs.filter((b) => b.user===user );
    // console.log(filteredBlogs)
    
    res.render("profile",{filteredBlogs});

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
    const api = await axios.get('http://localhost:8100/blogs/'+id)
    const blog = await api.data
    
    res.render('edit',{blog})
  }
  exports.blogDetails= async (req,res)=>{
    const id = req.params.id;
    const api = await axios.get('http://localhost:8100/blogs/'+id)
    const blog = await api.data
    
    res.render('blogDetails',{blog})
  }

  exports.updateBlog= async (req,res)=>{
    console.log(req.body,req.file)
    const id = req.params.id;
    const api = await axios.get('http://localhost:8100/blogs/'+id)
    const blog = await api.data
    console.log(blog)
    
    const updateBlog = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      image: req.file?req.file.filename:blog.image    
    }
    axios.patch('http://localhost:8100/blogs/'+id , updateBlog).then(()=>{
      res.redirect('/myBlogs')
    })
  }
  