const mongoose = require('mongoose');

const { Schema } = mongoose;

const AddressSchema = new Schema({
	type: {
		type: String,
		enum: ['home', 'work', 'other'],
		default: 'home',
		required: true,
	},
	title: {
		type: String,
		trim: true,
	},
	phone: {
		type: String,
		required: true,
		trim: true,
	},
	address: {
		type: String,
		required: true,
		trim: true,
	},
	city: {
		type: String,
		required: true,
		default: 'Bengaluru',
		trim: true,
	},
	state: {
		type: String,
		required: true,
		default: 'Karnataka',
		trim: true,
	},
	pincode: {
		type: String,
		required: true,
		trim: true,
	},
	country: {
		type: String,
		required: true,
		default: 'India',
		trim: true,
	},
}, { _id: false });

const UsersSchema = new Schema({
	phoneNo: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	userName: {
		type: String,
		required: true,
		trim: true,
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
		type: AddressSchema,
	},
	cartItems: [{
		productId: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
	}],
}, { timestamps: true });

module.exports = mongoose.model('Users', UsersSchema);