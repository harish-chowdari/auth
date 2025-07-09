const express = require('express');
const { userSignUp, userLogin, refreshTokenHandler, userLogout } = require('../controllers/Authcontroller');
const { loginValidation, registerValidation } = require('../validations/authValidations');

const router = express.Router();

router.post('/user-signup', userSignUp);
router.post('/user-login', userLogin); 
router.post('/user-refresh-token', refreshTokenHandler);
router.post('/userLogout', userLogout);

module.exports = router;
