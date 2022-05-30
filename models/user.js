var mongoose=require('mongoose');
const muv=require('mongoose-unique-validator');
const userSchema= new mongoose.Schema(
{
firstName:{type:String, required:true},
lastName:{type:String, required:true},
email:{type:String, required:true, unique:true},
password:{type:String, required:true}
}
)

mongoose.plugin(muv);
module.exports=mongoose.model('user',userSchema);
//ou bien
//const User=mongoose.model('user',userSchema);
//module.exports=User;