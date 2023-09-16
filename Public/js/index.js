const deletee =document.querySelectorAll('.delete')

deletee.forEach(blog=>{
    blog.addEventListener('click',e=>{
        e.preventDefault();
        e.currentTarget.parentElement.remove();
       const id = e.currentTarget.dataset.id;
       fetch(`http://localhost:8000/delete/${id}`,{
        method: "DELETE"
       })
    })
})