const express = require('express')
const {
	addProductToCart,
	getCart,
	increaseQuantity,
	decreaseQuantity
} = require('../controllers/cartController')
const router = express.Router()


router.post('/add-product-to-cart/:userId', addProductToCart)
router.get('/get-cart/:userId', getCart)
router.put('/increase-quantity/:userId/:productId', increaseQuantity)
router.put('/decrease-quantity/:userId/:productId', decreaseQuantity)


module.exports = router
