const mongoose=require('mongoose');
const userinfoSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    phonenumber:{
        required:true,
        type:String,
    },
    adress:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
        
    },
    occupation:{
        type:String,
        required:true,
    }



})
module.exports = mongoose.model('userinfo', userinfoSchema)