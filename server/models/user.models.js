const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name'],
        minlength:4,
        maxlength:25,
        trim:true
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator:validator.isEmail,
            message:'Please provide a valid email adress'
        },
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please provide password'],
        minlength:6,
        select:false
    }
},
    {timestamps: true},
);


UserSchema.pre('save',async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    return salt
})

UserSchema.methods.createJWT = function() {
    return jwt.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword = async function(candidate) {
    const isMatch = await bcrypt.compare(candidate,this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema);