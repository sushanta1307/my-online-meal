const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type:String,
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
