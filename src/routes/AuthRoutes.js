const express = require('express');
const { signUp, login, refreshTokenHandler, logout } = require('../controllers/Authcontroller');
const { loginValidation, registerValidation } = require('../validations/authValidations');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login); 
router.post('/refresh-token', refreshTokenHandler);
router.post('/logout', logout);

module.exports = router;
