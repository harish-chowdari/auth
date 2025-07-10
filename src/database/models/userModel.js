const mongoose = require('mongoose');

const { Schema } = mongoose;

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
    },
    cartItems: [{
        productId: { 
            type: Schema.Types.ObjectId, 
            required: true 
        }, 
        quantity: { 
            type: Number, 
            required: true, 
        }
    }],
});

module.exports = mongoose.model('Users', UsersSchema);