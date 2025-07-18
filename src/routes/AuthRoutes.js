const express = require('express');
const { userSignUp, userLogin, refreshTokenHandler, userLogout, getAllUsers, getUser, blockUser, unblockUser, getUserStats, addUserAddress } = require('../controllers/Authcontroller');
const { loginValidation, registerValidation } = require('../validations/authValidations');

const router = express.Router();

router.post('/user-signup', userSignUp);
router.post('/user-login', userLogin); 
router.post('/user-refresh-token', refreshTokenHandler);
router.post('/userLogout', userLogout);
router.get('/get-all-users', getAllUsers);
router.get('/get-user/:userId', getUser);
router.post('/add-user-address/:userId', addUserAddress);
router.put('/block-user/:userId', blockUser);
router.put('/unblock-user/:userId', unblockUser);
router.get('/get-user-stats', getUserStats);

module.exports = router;
