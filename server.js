const express = require('express')
const app = express();
const PORT = 8000;
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs')
app.use(express.static('Public'))
const secret="lmkawi";
app.use(cookieParser(secret));


const Routers = require('./Routes/routers')

app.use('/',Routers)







app.listen(PORT,()=>{
    console.log('PORT: '+PORT)
})