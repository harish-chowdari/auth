const { body, validationResult } = require('express-validator');

const loginValidation = [
    body('phoneNo')
    .exists().withMessage('Phone number is required').bail()
    .isNumeric().withMessage('Phone number must be numeric'),
    
    body('password')
    .exists().withMessage('Password is required').bail()
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const registerValidation = [
    body('email')
    .isEmail()
    .withMessage('Enter a valid email address'),
    
    body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    
    body('userName')
    .notEmpty().withMessage('User name is required'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { loginValidation, registerValidation };