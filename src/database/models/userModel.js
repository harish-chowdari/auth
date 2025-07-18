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
    isBlocked: {
        type: Boolean,
        required: true,
        default: false,
    },
    fullAddress: {
        addressLine1: {
            type: String,
            required: true,
        },
        addressLine2: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        pincode: {
            type: String,
            required: true,
        }
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
}, { timestamps: true });

module.exports = mongoose.model('Users', UsersSchema);