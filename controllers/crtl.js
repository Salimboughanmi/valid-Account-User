const User = require('../models/user.js');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userValidation=require('../validation/validation');
const user = require('../models/user.js');

//Implémentation de la Fonction inscription

exports.inscription = (req, res) => {
    const { body } = req
    //valider les données
    const{error}=userValidation(body).userValidationSignUp
    if (error) return res.status(401).json(error.details[0].message)
    //hashage du mot de passe
   bcrypt.hash(body.password, 10)
        .then(hash => {
            if (!hash) return res.status().json({ msg: "server error" })
           //effacer l'ancien mot de passe et créer un nouveau utilisateur en remplaçant le mot de passe par le hash
            delete body.password
            new User({ ...body, password: hash })
            //sauvegarder le nouveau utilisateur crée avec le mot de passe crypté 
                .save()
                .then((user) => {
                    console.log(user)
                    res.status(201).json({ msg: "user created!" })
                })
                .catch((error) => res.status(501).json(error))
        })
}

exports.connexion = (req, res) => {
    const {email,password} = req.body
     //validation des données
  const {error}=userValidation(req.body).userValidationLogin
  if (error) return res.status(401).json(error.details[0].message)


//chercher l'utilisateur dans la bd
User.findOne({email: email})
.then(user=>{
    if(!user) return res.status(404).json({msg:"user not found"})
  
    //vérifier le mot de passe cad si le mot de passe envoyé par l'user correspond à celui stocké dans la bd (qui est crypté)
        


    
bcrypt.compare(password, user.password)
.then(match=>{
if (!match) return res.status(500).json{msg: "server Error"}
//dans le cas ou les mots de passe matche il faut créer un token d'autentification

res.status(200).json({
email : user.email,
token:jwt.sign({email:user.email}, "Secret_Key", {expiresIn :"12h"})
})
})

.catch(error=>res.status(500).json(error))

})
.catch(error=>res.status(500).json(error))
}