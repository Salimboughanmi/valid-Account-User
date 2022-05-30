const express=require('express');
var router = express.Router();
const {inscription}=require('../controllers/crtl.js');
const {connexion}=require('../controllers/crtl.js');

//création de la route d'inscription 
router.post('/inscription',inscription);
router.post('/connexion',connexion);
module.exports=router;


