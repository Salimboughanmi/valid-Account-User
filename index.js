const express=require('express');
const bcrypt=require('bcrypt');
var mongoose=require('mongoose');
//on récupère notre fichier contenant nos  routes
const routes=require('./routes/routes');
const app=express();
var bodyParser=require('body-parser');
// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongoose.connect('mongodb://localhost:27017/Valida',{useNewUrlParser:true})
.then(()=>console.log('CONNECTED TO DB'))
.catch(err=>console.log('fail',err));

app.listen(8088);