const express = require('express')
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs')
app.use(express.static('Public'))


const Routers = require('./Routes/routers')

app.use('/',Routers)







app.listen(PORT,()=>{
    console.log('PORT: '+PORT)
})