const axios = require('axios');
exports.createBlog=(req,res)=>{
    
    const {title,author,description}=req.body;
    const image=req.file
    console.log(image)
    axios.post('http://localhost:8100/blogs',{title,author,description,image:image.filename})

    res.redirect('allBlogs')
}
exports.getBlogs=async(req, res) => {
    let fetchBlogs= await axios.get('http://localhost:8100/blogs');
    let blogs =await fetchBlogs.data;
    // console.log(blogs)
    res.render("allBlogs",{blogs});

  }