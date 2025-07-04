const mongoose = require('mongoose');
const { REFRESH_EXPIRES_IN } = require('../../config/constants');

const RefreshTokenSchema = new mongoose.Schema({
    user: {   
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    token: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: REFRESH_EXPIRES_IN 
    }
});

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);
