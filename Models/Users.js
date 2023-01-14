const mongoose = require('mongoose')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    cnfpassword:{
        type:String,
        require:true,
    },
    tokens:[
        {
            token:{
                type:String,
                required:true,
            }
        }
    ],
    complaints:[
        {
            problem:{
                type:String,
                
            },
            status:{
                type:String
            }

        }
    ]
    
    
})
UserSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,10);
        this.cnfpassword=await bcrypt.hash(this.cnfpassword,10);
    }
    next();
})

UserSchema.methods.generateAuthToken= async function(){
    try {
        let token=jwt.sign({_id:this._id.toString()},"MYNAMEISMADHAVMYNAMEISMADHAVMYNA");
        this.tokens=this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

module.exports = mongoose.model('Users', UserSchema)