const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    phoneNo: {
        type: String,
        unique: true,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        // unique: true,
    },
    password: { 
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Users', UsersSchema);