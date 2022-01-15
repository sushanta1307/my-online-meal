const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    phone: {
        type:Number,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    message: {
        type:String,
        required:true
    }
})

const FeedbackUser = new mongoose.model("onlinemeal-feedback",schema);

module.exports = FeedbackUser;
