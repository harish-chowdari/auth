const express = require('express');
const { userSignUp, userLogin, refreshTokenHandler, userLogout, getAllUsers, blockUser, unblockUser } = require('../controllers/Authcontroller');
const { loginValidation, registerValidation } = require('../validations/authValidations');

const router = express.Router();

router.post('/user-signup', userSignUp);
router.post('/user-login', userLogin); 
router.post('/user-refresh-token', refreshTokenHandler);
router.post('/userLogout', userLogout);
router.get('/getAllUsers', getAllUsers);
router.put('/block-user/:userId', blockUser);
router.put('/unblock-user/:userId', unblockUser);

module.exports = router;
