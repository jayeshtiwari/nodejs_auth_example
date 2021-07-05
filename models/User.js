const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name : {
        type:String,
        required : true,
        min:4,
        max:20
    },
    email : {
        type:String,
        required : true,
        min:4,
        max:30
    },
    password:{
        type:String,
        required : true,
        min:6,
        max:20
    },
    date:{
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('User' , userSchema);