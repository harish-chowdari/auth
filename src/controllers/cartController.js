const UserModel = require('../database/models/userModel')

async function addProductToCart(req, res) {
	try {
		const { userId } = req.params
		const { productId, quantity } = req.body
		const user = await UserModel.findById(userId)
		if (!user) return res.status(404).json({ message: 'User not found' })
		user.cartItems = user.cartItems || []
		user.cartItems.push({ productId, quantity })
		await user.save()
		return res.status(200).json(user.cartItems)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

async function getCart(req, res) {
	try {
		const { userId } = req.params
		const user = await UserModel.findById(userId)
		if (!user) return res.status(404).json({ message: 'User not found' })
		return res.status(200).json(user.cartItems || [])
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

async function increaseQuantity(req, res) {
	try {
		const { userId, productId } = req.params
		const user = await UserModel.findById(userId)
		if (!user) return res.status(404).json({ message: 'User not found' })
		const item = user.cartItems.find(i => i.productId.toString() === productId)
		if (!item) return res.status(404).json({ message: 'Product not found in cart' })
		item.quantity++
		await user.save()
		return res.status(200).json(user.cartItems)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

async function decreaseQuantity(req, res) {
	try {
		const { userId, productId } = req.params
		const user = await UserModel.findById(userId)
		if (!user) return res.status(404).json({ message: 'User not found' })
		const item = user.cartItems.find(i => i.productId.toString() === productId)
		if (!item) return res.status(404).json({ message: 'Product not in cart' })
		if (item.quantity > 1) {
			item.quantity--
		} else {
			user.cartItems = user.cartItems.filter(i => i.productId.toString() !== productId)
		}
		await user.save()
		return res.status(200).json(user.cartItems)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

module.exports = {
	addProductToCart,
	getCart,
	increaseQuantity,
	decreaseQuantity
}
