const mongoose=require('mongoose');
const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    },
    cnfpassword:{
        type:String,
        require:true
    }




})
module.exports = mongoose.model('admin', adminSchema)