const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstname: {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required:true
    },
    gender: {
        type:String,
        required:true
    },
    age: {
        type:Number,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    phone: {
        type:Number,
        required:true
    }
})

const RegisterChef = new mongoose.model("onlinemeal-chef",schema);

module.exports = RegisterChef;