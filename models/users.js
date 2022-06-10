const mongoose = require('mongoose');

var User = mongoose.model('User', {
    name: { type: String },
    user_id: { type: Number },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
    paidCouser_id:{ type:Array },
    userType:{ type:String }
});

module.exports = { User };