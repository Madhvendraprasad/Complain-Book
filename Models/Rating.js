const mongoose=require('mongoose');
const ratingSchema=new mongoose.Schema({
    complaintid:{
        type:String,
        require:true,
    },
    rating:{
        type:String,
        require:true,
    }

})
module.exports = mongoose.model('rating', ratingSchema)