const mongoose = require('mongoose')
const ComplaintSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
    },
    ptype:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        
    },
    paid:{
        type:String,
        
    },
    assigned:{
        type:String,
    }
    
    
})
module.exports = mongoose.model('Complaint', ComplaintSchema)